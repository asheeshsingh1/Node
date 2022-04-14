[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://1drv.ms/u/s!Ar_vfbHCB9exc2gL-vC3tKlqaXo?e=QzYVfC">
    <img src="https://en.pimg.jp/060/799/223/1/60799223.jpg" alt="Logo" width="160" height="150">
  </a>

  <h3 align="center">Tiffny BellyFul Vendor App</h3>

  
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
* Project aims at Vendor interaction with Tiffny BellyFul App.
* Vendor can add, read , update or delete a Restraunt or a Menu Item under a Restraunt.



Functionalities:
* Vendor needs to authorize first, or just register himself/herself.
* After authorization vendor can add, read, update or delete the restraunt or a menu item.
* If Vendor is not authorised or parameters passed are not appropriate then error will be shown to the vendor.

### Built With
[NodeJs]    
[Javascript]  
[PostGreSQL with Mongoose]
[Mongoose]
[JWT]
[BCRYPTJS]

<!-- GETTING STARTED -->
## Getting Started

Want to run on your device locally??    
Follow the procedure below

### Prerequisites

1. Install nodeJs
2. Clone the repo
3. run command: cd TodoApp
4. run command: npm start
5. Voilla! application is UP


### Installation

Clone the repo
   ```sh
   gh repo clone asheeshsingh1/Tiffny-BellyFul-Vendor-App
   ```



## Postman Collection

Link : https://www.getpostman.com/collections/1b9416e793ce7ee21188

## Schema
Please visit : 
https://dbdiagram.io/d/625899302514c9790333d49e


## Meta Info
* Currently the apps supports simple interaction of vendor with restraunt and menu items registered with restraunt.
* A single Vendor can have multiple Restraunt, and therefore a single restraunt can also have many menu items.
* Later every time when a Vendor creates a Restraunt we insert that row in the PostGreSQL Database and same is being done for a Menu Item.
* So from Menu Table, we will be able to fetch:

<ol>
    <li>All the Menu Items created by the Vendor</li>
    <li>Particular created by the Vendor</li>
</ol>

* Instead of storing plain password in database, we can store hashed password using bcryptjs library of JS. While authenticating the user we can simple match the hashed password with the password stored in DB.
* We can also add a default page for requests that does not map for any url.

<!-- CONTACT -->
## Contact

Asheesh Singh - [Linked in](https://github.com/asheeshsingh1/)




[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://github.com/asheeshsingh1/
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
