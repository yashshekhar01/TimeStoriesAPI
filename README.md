# Time Stories API

This is a simple Node.js application that fetches the latest 6 stories from Time.com and serves them as a JSON response via an API endpoint.



## How to Run



## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.



## Steps to Run


## Clone the Repository or Download the Files

   If you haven't already, clone the repository or download the `time_stories_server.js` file to your local machine.


## Navigate to the Project Directory

   Open your terminal and navigate to the directory where `time_stories_server.js` is located.


## Run the Server

Start the Node.js server by running the following command:


node time_stories_server.js


## Access the API

Open your web browser and navigate to http://localhost:8080/getTimeStories to view the latest 6 stories from Time.com in JSON format.


## Additionally, you can visit http://localhost:8080/ to see a welcome message.




## Example Response

When you access the /getTimeStories endpoint, you'll receive a response like this:

[
    {
        "title": "Story Title 1",
        "link": "https://time.com/story-link-1"
    },
    {
        "title": "Story Title 2",
        "link": "https://time.com/story-link-2"
    },
    // 4 more stories
]