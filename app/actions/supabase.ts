import { Pokemon } from '@/components/PokemonCard'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://eldxhpthczdujietbihq.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function updateSearch(searchTerm:string,pokemon:Pokemon){
    //checking if pokemon already exists
try {

  const res = await fetch(`${process.env.NEXT_PUBLIC_POKE_API}/${searchTerm.toLowerCase()}`);
const details = await res.json();

    const {data:existing,error:selectError} = await supabase.from("pokemon")
    .select("*")
    .eq("name",searchTerm)

    if(selectError) throw selectError;

    if(existing && existing.length>0){
        const doc = existing[0]
        const {error:updateError} = await supabase.from("pokemon")
        .update({count:doc.count+1})
        .eq("id",doc.id)
          if(updateError) throw updateError
          

    }else{
        const{error:insertError}= await supabase.from("pokemon").insert([{
            name:searchTerm.toLowerCase(),
            count:1,
            image:details?.sprites.other['official-artwork'].front_default || ""
        }])
        if (insertError) throw insertError
    }
} catch (error) {
     console.error("Error updating Pokémon search:", error);
}
  
}

export async function getPopularPokemons(){
    try {
        const result = await supabase.from("pokemon").select("*").limit(10).order("count",{ascending:false})
        return result.data
    } catch (error) {
        
    }
}