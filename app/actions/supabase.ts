import { Pokemon } from '@/components/PokemonCard'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://eldxhpthczdujietbihq.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!
console.log(supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey)

export async function updateSearch(searchTerm:string,pokemon:Pokemon){
    //checking if pokemon already exists
try {
    const {data:existing,error:selectError} = await supabase.from("pokemon")
    .select("*")
    .eq("name",searchTerm)

    if(selectError) throw selectError;

    if(existing && existing.length>0){
        const doc = existing[0]
        console.log(doc)
        const {error:updateError} = await supabase.from("pokemon")
        .update({count:doc.count+1})
        .eq("id",doc.id)
          if(updateError) throw updateError

    }else{
        const{error:insertError}= await supabase.from("pokemon").insert([{
            name:searchTerm,
            count:1,
            image:pokemon||""
        }])
        if (insertError) throw insertError;
    }
} catch (error) {
     console.error("Error updating Pokémon search:", error);
}
  
}