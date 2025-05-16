export function fillReviewPanel(){
  
   
   fetch('/data/product-reviews.json')
  .then(response => response.json())
  .then(data => {
    
    
    let [avgRating,amountOfStars,star_1,star_2,star_3,star_4,star_5] = starRating(data);

        fillReviewPanel__header(avgRating);
    });
  
  function starRating(data){
    let sumRating = 0; 
    let countAmount =0;
    let star_1 = 0;
    let star_2 = 0;
    let star_3 = 0;
    let star_4 = 0;
    let star_5 = 0;

    for(let d of Object.values(data) ){
        countAmount++;
        sumRating+=d.rating;
        
        switch(d.rating){
            case 1:
                star_1++;
            break;
            case 2:
                star_2++;
            break;
            case 3:
                star_3++;
            break;
            case 4:
                star_4++;
            break;
            case 5:
                star_5++;
            break;
        }
    }

    let avg = Math.floor(sumRating/countAmount * 10) / 10 ;

    console.log(avg,countAmount,star_1,star_2,star_3,star_4,star_5);
    return [avg,countAmount,star_1,star_2,star_3,star_4,star_5];
  }

  function fillReviewPanel__header(avg){

    const ReviewPanel__header = document.querySelector(".review-panel__header");
    
    const Rating = ReviewPanel__header.querySelector(".review-panel__p");
    Rating.innerHTML = avg;

    const StarsSvg =  ReviewPanel__header.querySelector(".svgPic-starBig");
    let stars = Array.from( StarsSvg.getElementsByTagName("path") );
    
    let starIndex = Math.floor(avg);
    let part = parseInt( avg.toString().slice(2) ) ; 
   
    stars.forEach( (item,index)=>{
        if( index+1 <= starIndex )
        item.style.fill="url(#full)";
        else {
            switch(part){
                case 1:
                case 2:
                case 3:
                case 4:
                    item.style.fill="url(#third)";
                break;
                case 5:
                    item.style.fill="url(#half)";
                break;
                case 6:
                case 7:
                case 8:
                    item.style.fill="url(#two-thirds)";
                break;
            }
        }
    })

    // stars[0].style.fill = "currentColor";
   


    // "#ffd800" url(#half)
  }

  
}