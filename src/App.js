import React from "react";
import { useState,useEffect } from "react";
import SearchForm from "./SearchForm";
function App() {

  const [articles,setArticles]= useState([]);
  const [term,setTerm]=useState('everything');
  const [isLoading,setIsLoading]=useState(true);

  useEffect(()=>{
    const fetchArticles= async()=>{
    try {
      
        const res= await fetch(`
        https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=Q6vozzgWGz6XfaDUEIKccLNNBZBBJLYT `)

        const articles= await res.json();
        console.log(articles.response.docs);
        setArticles(articles.response.docs)
        setIsLoading(false);
      }
     catch (error) {
      console.error(error);
    }
  }

    fetchArticles();
  }, [term])
  return (
    <>

    <div className="showcase">
      <div className="overlay px-5">
       <h1 className="text-4xl font-bold text-white text-center mb-4 capitalize lg:text-6xl">Read Your Favorite Article in {term}</h1>
       <SearchForm searchText={(text)=>setTerm(text)}/>
      </div>
    </div>
      {isLoading ? <h1 className="text-center mt-20 font-bold text-6xl">Waiting For Server Response</h1>: <section className="grid grid-cols-1 gap-10 px-5 pt-10 pb-20">
       {articles.map((article)=>{
         const {abstract,headline:{main},byline:{original},lead_paragraph,news_desk,section_name, web_url,_id,word_count } = article;

         return (
           <article key={_id} className="bg-white py-10 px-5 rounded-lg lg:w-9/12 lg:mx-auto">
             <h2 className="font-bold text-2xl mb-5 lg:text-4xl">{main}</h2>
             <p>{abstract}</p>
             <p>{lead_paragraph}</p>

             <ul className="my-4">
               <li>{original}</li>
               <li><span className="font-bold">Word count:</span>{word_count}</li>
               <li><span className="font-bold">Section Name:</span>{section_name}</li>
               <li>
               <span className="font-bold">News Desk:</span>{news_desk}</li>
             </ul>

             <a href={web_url} target="_blank" className="underline">Complete Article</a>
           </article>
         )
       })}
      </section>}
    </>
  );
}

export default App;
