export default {
  
    makeParagraph(obj) {
    
        return `<p class="blog_post_text">
        ${obj.data.text}    
    </p>`
      
    },


        makeList(obj){
            if(obj.data.style === "unordered"){

                const list = obj.data.items.map(item =>{
                    return `<li>${item}</li>`
                })

                return `<ul class="blog_post_ul">
                    ${list.join("")}
                </ul>`

            }else {
                const list = obj.data.items.map(item=>{
                    return `<li>${item}</li>`
                })
                return `<ul class="blog_post_ul">
                ${list.join("")} 
               </ul> `
            }
        },
       
        makeHeader(obj) {
            return `<h${obj.data.level} class="blog_post_h${obj.data.level}">${obj.data.text}</h${obj.data.level}>`
           

        },


        makeİmage(obj){
            const caption = obj.data.caption ? `<div class="blog_caption">
            <p>${obj.data.caption}</p>
        </div>` : ''
            return `<div class="blog_image">
            <img src="${obj.data.url}" alt="${obj.data.caption}"/>
            ${caption}
    </div>`
       
        },
     
        makeCode(obj){
                 return `<section class="nws3_sec4">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
        
                   <div class="news_code">
                        <pre>
                            <code class="html">
                            ${obj.data.code}
                            </code>
                         </pre>
                    </div>
        
        
                </div>
            </div>
        </section>	`
        },

        makeQuote(obj){

            return `
            <div class="animated-border-quote">
              <blockquote>
                <p> ${obj.data.text}</p>
                <cite>${obj.data.caption}</cite>
              </blockquote>
            </div>`

        },
    

}