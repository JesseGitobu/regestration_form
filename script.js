const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})

const fullName = document.getElementById("fname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");


// function for form varification
function formValidation() {
  // checking length of name
  if (fullName.value.length < 2 || fullName.value.length > 20) {
    alert("Name length should be more than 2 and less than 21 charaters");
    fullName.focus();
    return false;
  }
  // checking email format
//   if (email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
//     alert("Please enter a valid email!");
//     email.focus();
//     return false;
//   }
  // checking password character pattern
  if (phone.value.match(/^[1-9][0-9]{9}$/)) {
    alert("Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, and must be between 8 and 15 characters long.");
    phone.focus();
    return false;
  }
  
  // checking zip code
  if (!address.value.match(/^[0-9]{6}$/)) {
    alert("Zip code must be 6 characters long number!");
    address.focus();
    return false;
  }
  return true;
}



const sampleForm = document.getElementById("regForm");

//Add an event listener to the form element and handler for the submit an event.
sampleForm.addEventListener("submit", async (e) => {
  /**
   * Prevent the default browser behaviour of submitting
   * the form so that you can handle this instead.
   */
  e.preventDefault();

  /**
   * Get the element attached to the event handler.
   */
  let form = e.currentTarget;

  /**
   * Take the URL from the form's `action` attribute.
   */
  let url = 'http://developers.gictsystems.com/api/dummy/submit/';

  try {
    /**
     * Takes all the form fields and make the field values
     * available through a `FormData` instance.
     */
    let formData = new FormData(form);

    /**
     * The `postFormFieldsAsJson()` function in the next step.
     */
    let responseData = await postFormFieldsAsJson({ url, formData });

    //Destructure the response data
    let { serverDataResponse } = responseData;

    //Display the response data in the console (for debugging)
    console.log(serverDataResponse);
  } catch (error) {
    //If an error occurs display it in the console (for debugging)
    console.error(error);
  }
});

/**
 * Helper function to POST data as JSON with Fetch.
 */
async function postFormFieldsAsJson({ url, formData }) {

    
  //Create an object from the form data entries
  let formDataObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  let formDataJsonString = JSON.stringify(formDataObject);

  //Set the fetch options (headers, body)
  let fetchOptions = {
    //HTTP method set to POST.
    method: "POST",
    //Set the headers that specify you're sending a JSON body request and accepting JSON response
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // POST request body as JSON string.
    body: formDataJsonString,
  };

  //Get the response body as JSON.
  //If the response was not OK, throw an error.
  let res = await fetch(url, fetchOptions);

  //If the response is not ok throw an error (for debugging)
  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  //If the response was OK, return the response body.
  return res.json();
}
await fetch(url, {
    mode: 'no-cors'
})