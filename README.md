# Review/SDC


## CRUD API

# GET
Use */reviews/business/:bId* to get reviews based on business Id. Using this endpoint will return an object that contains an array of reviews.

{
    "reviews": [
        {
            "useful": [
                {
                    "username": "Malvina Mraz",
                    "uId": 49
                },
                {
                    "username": "Graham Bernhard",
                    "uId": 23
                }
            ],
            "funny": [
                {
                    "username": "Shanny Cruickshank",
                    "uId": 76
                }
            ],
            "cool": [],
            "_id": "5d22234c67acc9052cfd5712",
            "uId": 49,
            "bId": 1,
            "rating": 4,
            "reviewText": "Filet mignon flank venison ribeye spare ribs, andouille short ribs biltong bacon leberkas kielbasa doner.  Prosciutto short ribs buffalo turducken chuck venison chicken swine.  Frankfurter pastrami andouille biltong.  Pastrami tongue picanha leberkas swine bacon sirloin chuck ham hock cow.",
            "checkin": false,
            "createdAt": "2017-03-07T07:23:12.580Z",
            "updatedAt": "2017-03-07T07:23:12.580Z",
            "__v": 0
        }
    ]
}


# POST API
/reviews/newReview/:bId
Using this enpoint will create a review for a given business, the business Id must be passed in along with the new review data.

The business Id must be passed in the params of the url, and the body must contain the review information. Checkin should be set default unless the user is checkin.

{
	"checkin": false,
	"rating": 4,
	"reviewText": "Review was created with PostMan in Product 3",
	"uId": 45
}

A successful request will return an array with the review's information as below:
[
    {
        "useful": [],
        "funny": [],
        "cool": [],
        "_id": "5d28f60889aabd02dd198e77",
        "checkin": false,
        "rating": 4,
        "reviewText": "Review was created with PostMan in Product 5",
        "uId": 34,
        "bId": 5,
        "__v": 0,
        "createdAt": "2019-07-12T21:05:12.457Z",
        "updatedAt": "2019-07-12T21:05:12.457Z"
    }
]

# PATCH API
/review/modifyReview/
In order to update the 