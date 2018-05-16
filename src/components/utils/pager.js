export default class Pager {
  static token=null;
  constructor(){
  }

  static instance(){
    return Pager.token;
  }

  static makeNew(){
    Pager.token = new Pager();
    return Pager.token;
  }

  getNext(q, offset, limit) {
    return this.fetchApi(q, offset, limit).then(result=>{
      if(this === Pager.token){
        return result;
      }
    });
  }

//получить страницу данных
  fetchApi(q, limit, offset) {
    let params = `offset=${encodeURIComponent(offset)}&limit=${limit}`+
      `${ q? '&q=' + encodeURIComponent(q) : ''}`;

    return fetch(`https://api.zp.ru/v1/vacancies?${params}`);
  }


}