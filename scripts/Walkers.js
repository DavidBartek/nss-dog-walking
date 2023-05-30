import { getCities, getWalkers } from "./database.js"
import { getWalkerCities } from "./database.js"

/*
Old event listener: click on walker name in "walkers" list, will display a window alert "walkername services walker city".
This will no longer work after database update on 5/30/23.
*/
// document.addEventListener(
//     "click",  // This is the type of event
//     (clickEvent) => {
//         /*
//             The target of a click event is the most specific HTML element
//             that was clicked by the user.
//         */
//         const itemClicked = clickEvent.target

//         /*
//             Only run the rest of the logic if a walker <li> was clicked
//         */
//         if (itemClicked.id.startsWith("walker")) {

//             /*
//                 Extract the primary key from the id attribute of the list
//                 item that you clicked on. Refer back to the code you
//                 wrote for each list item. Note the format of the id
//                 attribute ("walker--2" if you clicked on the second one).

//                 This code splits that string apart into an array, and
//                 captures the "2" and assigns it to be the value of the
//                 `walkerId` variable.

//                 Splitting a string in JavaScript:
//                     https://www.youtube.com/watch?v=u2ZocmM93yU

//                 Destructuring in JavaScript:
//                     https://www.youtube.com/watch?v=UgEaJBz3bjY
//             */
//             const [, walkerId] = itemClicked.id.split("--")

//             /*
//                 Now that you have the primary key of a walker object,
//                 find the whole object by iterating the walkers array.
//             */
//             for (const walker of walkers) {

//                 /*
//                     Compare the primary key of each walker to the one
//                     you have. As soon as you find the right one, display
//                     the window alert message.
//                 */
//                 if (walker.id === parseInt(walkerId)) {
//                     window.alert(`${walker.name} services ${walker.city}`)
//                 }
//             }
//         }
//     }
// )

/* new event listener: when a walker in "Walkers" list is clicked on, window alert will display: "walkername services city1, city2, city3, etc."
Updated to work with addition of cities and walkerCities to database on 5/30/23
*/

// set up event listener which triggers when an element with id="walker" is clicked. Isolate this ID number.
document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("walker")) {
            const [, walkerId] = itemClicked.id.split("--")
            let citiesString = "" // declares blank citiesString string. This will be built as matches are found.
            // iterate through walkers
            // using walker id (pk), find all matching instances of this id (fk) in the walkerCities array
            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    // if a match is found: iterate through all objects in the walkerCities array (below); find a matching walkerID, access that walker.
                    citiesString += `${walker.name} services: ` // accesses walker's name property; adds to string.
                    for (const walkerCity of walkerCities) {
                        // iterate through walkerCities
                        if (walkerCity.walkerId === walker.id) {
                            // if the above-accessed walkerId is found in any of the walkerCities objects, access that walkerCity object
                            for (const city of cities) {
                                // iterate through cities
                                if (city.id === walkerCity.cityId) {
                                    // if the above-accessed cityId is found in any of the cities objects, access that city object.
                                    citiesString += `${city.name} ` // add the city's name to the string
                                }
                            }
                        }
                    }
                }
            }
            window.alert(citiesString) // display a window alert which contains the built string
        }
    }
)

// **** note: you could have done this much simpler and modular by breaking the above into distinct functions. ****

const walkers = getWalkers()
const cities = getCities() // gets all objects in cities array from database, assigns to variable cities
const walkerCities = getWalkerCities() // gets all objects in walkerCities array from database, assigns to variable walkerCities

export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"

    return walkerHTML

}

