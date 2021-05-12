import {
  bookHasPrice
} from '../utils/helper';

const priceFinder = ({
  searchResults = []
}) => {

  const getUrl = isbn_number => isbn_number ? `https://booksrun.com/api/v3/price/buy/${isbn_number}?key=${process.env.REACT_APP_BOOKSRUN_API_KEY}` : null;


  let updatedSearchResults = searchResults.map(
    (b, idx) => {
      // drill into each book -- if no price data call api for each one? 

      if (!bookHasPrice(b)) {

        const isbn_array = b.volumeInfo.industryIdentifiers ?? [];
        
        let count = isbn_array.length;
        
        if (!!count) {
          fetch(getUrl(isbn_array[0]))
          .then(res => res.json())
          .then(data => {
            // put that data in there baby
            // b.saleInfo ? {...b.saleInfo, listPrice:  }
          })
          .catch();
          // fetch(getUrl(isbn_array[1])); --- if 10dig doesn't return expected, check 13dig (isbn)
        }
        
      }
    }
  );


  return updatedSearchResults;
}

export default priceFinder;