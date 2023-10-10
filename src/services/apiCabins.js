import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
  const imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imgPath = hasImagePath ? newCabin.image: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

  //1. Create cabin
  let query = supabase.from("cabins");

  //A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imgPath }]);

  //B) EDIT
  if(id) query = query.update({ ...newCabin, image: imgPath}).eq('id', id);

  const {data, error} = await query.select().single();


  if (error) {
    throw new Error("Cabin could not be created");
  }

  //Upload image to storage
  if(hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, newCabin.image);

  //Delete image if there was a storage error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
