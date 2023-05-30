import { getPets } from "./database.js"

// add event listener which displays that a given dog barks at you 

// 2. Add a click event listener to your HTML document.
document.addEventListener( // .addEventListener is a built-in method that (surprise!) creates an event listener function
    "dblclick", // type of event that will be 'listened' for
    (clickEvent) => { // the name of the parameter of the anonymous function created by .addEventListener()

        // 3. Store the target HTML element of the click event in a variable
        const clickedItem = clickEvent.target // assigns the .target property of passed-in clickEvent to variable, clickedItem

        // 4. check if the id property of the element starts with the string of "pet"
        if (clickedItem.id.startsWith("pet")) {

            // 5. if it does, use the split() method on the id property to get an array containing two strings (e.g. ["pet", "4"])
            // 6. Use array deconstruction to assign the primary key to a variable named petPrimaryKey
            const [, petPrimaryKey] = clickedItem.id.split("--") // this line COULD be split into multiple lines for clarity.
            // ^ creates new array by splitting the string "pet--id": ["pet", "id"]
            // ^ destructures this array by assigning the "id" string to new variable petPrimaryKey. ',' in the argument skips over the first array value.

            // 7. Find the whole pet object by iterating the array of pet objects and comparing each primary key to the integer value of the petPrimaryKey variable
            for (const pet of pets) {
                if (pet.id === parseInt(petPrimaryKey)) { // converts data type in petPrimaryKey from string to integer; evaluates if it === pet.id
                    // 8. As soon as a match is found, display a message that the dog barks at you - "Rocket barks at you"
                    window.alert(`${pet.name} barks at you`)
                }
            }
        }
    }
)

const pets = getPets()

export const RegisteredPets = () => {
    let petHTML = "<ul>"

    for (const pet of pets) {
        // petHTML += `<li>${pet.name}</li>`
        // 1. Update the code in RegisteredPets module so that the <li> for each pet has an id attribute with the following format id="pet--1". The primary key should be correct for each element.
        petHTML += `<li id="pet--${pet.id}">${pet.name}</li>`
    }

    petHTML += "</ul>"

    return petHTML
}

