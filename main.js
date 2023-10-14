let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

let mood='create';
let tmp;

//get total
function getTotal(){
   if(price.value != ''  ){
    let result = (+price.value + +taxes.value + +ads.value)
    - +discount.value ;
    total.innerHTML= result;  
    total.style.background='#040'

   }else{
    total.innerHTML='';
    total.style.background='#861109';
   }
}

//create product
let datapro;
if(localStorage.product != null ){
   datapro=JSON.parse(localStorage.product)
} else{
   datapro =[];
}
   submit.onclick=function(){
    let newPro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value !=''
    && price.value!=''
    && category.value!=''
    && newPro.count<100){
      if(mood==='create'){if(newPro.count > 1){
      for(let i=0; i< newPro.count;i++ ){
         datapro.push(newPro);

      }
    }else{
      datapro.push(newPro);
    }
   
   }else{
      datapro[  tmp   ]= newPro;
      mood='create';
      submit.innerHTML='create';
      count.style.display="block";

   }
     clearData();
    }
   
    //save localStorage
      localStorage.setItem('product', JSON.stringify(datapro))
      
      showData();      
   }
//clear Data
function clearData(){
   title.value=''
   price.value=''
   taxes.value=''
   ads.value=''
   discount.value=''
   total.innerHTML='' 
   count.value=''
   category.value=''
}

//show Data

function showData(){
   getTotal();
   let table ='';
   for(let i =0; i< datapro.length;i++){
      table += `<tr>
      <td> ${i+1} </td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td> <button onclick="updateData(${i})" id="updata">update</button></td>
      <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
  </tr>
  ` 
    }
   
   document.getElementById('tbody').innerHTML= table;
   let btnDelete = document.getElementById('deleteAll');
   if(datapro.length > 0){
      btnDelete.innerHTML= `
      <button onclick="deleteAll()"> Delete All(${datapro.length}) </button>
      `

   }else{ btnDelete.innerHTML='' ;
}
}
   showData();
   //Delete data
   function deleteData(i){
      datapro.splice(i,1)
      localStorage.product=JSON.stringify(datapro); 
      showData();
   } 

   //DeleteAll
   function deleteAll(){
      localStorage.clear()
      datapro.splice(0)
      showData();
   }


   //updata  
 function updateData(i){
   title.value=datapro[i].title;
   price.value=datapro[i].price;
   taxes.value=datapro[i].taxes;
   ads.value=datapro[i].ads; 
   discount.value=datapro[i].discount;
   getTotal();
   count.style.display='none';  
   category.value=datapro[i].category;
   submit.innerHTML= 'update';
   mood='updata';
   tmp = i;
   scroll({
      top:0, 
      behavior:'smooth',
   })
 }

 //search
 let search= document.getElementById('search');
let searchMood ='title';
function getsearchMood(id){
if(id=='searchTitle'){
   searchMood='title';
  

}else{
   searchMood= 'category';
 
}
search.placeholder ='search By ' + searchMood;
   search.focus(); 
   search.value='';
   showData();
}

 function searchData(value){
   let table='';
   for(let i =0; i< datapro.length;i++){
   if(searchMood =='title' )
   {
         if(datapro[i].title.includes(value.toLowerCase())){
            table += `<tr>
            <td> ${i} </td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td> <button onclick="updateData(${i})" id="updata">update</button></td>
            <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
        </tr>
        ` 

      }

   }
   else{
         if(datapro[i].category.includes(value.toLowerCase())){
            table += `<tr>
            <td> ${i} </td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td> <button onclick="updateData(${i})" id="updata">update</button></td>
            <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
        </tr>
        ` 

       } 

      

   }

   document.getElementById('tbody').innerHTML= table;

 }
 }



