const apiKey = "sfkrx1uu6FHaI4vS50-4PRnkGOoXsF8pvtR5QCp9elTBhCdfX4i759HZ6wyIwL9eIbdjWiIiYKKnawsyXerQczF1ZloW3-E4WtfbGTKF4B7Ab6qx7vXMBuxv0JSRWnYx";

const Yelp = {
  search(term, location, searchBy) {
    const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
    const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${searchBy}`;
    return fetch(corsAnywhere + url, {
      headers: {Authorization: `Bearer ${apiKey}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
          let businessObj = {
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
            id: business.id,
            imageSrc: business.image_url
          };
          return businessObj;
        });
      }
    });
  }
};

export default Yelp;