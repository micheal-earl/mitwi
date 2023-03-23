<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Mitwi</h3>

<p align="center">
    Mitwi is a Twitter clone built with Deno and Fresh.
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Post Mortem</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://www.youtube.com/watch?v=0Ip1Dl0pyxw)

I decided to undertake this project because I wanted to prove to myself and
possible employers that I can quickly adapt to new tech stacks and create
working prototypes.

Unfortunately, I failed to see just how detrimental some of the choices I was
making would be to actually creating a working web app.

Here's why:

- Deno is an incredible javascript runtime. It even support NPM modules.
  However, it barely supports npm modules. Many of the things I tried simply did
  not work.
- Deno Deploy is an awesome service for deploying your deno based apps.
  Unfortunately, it does not support Deno's `npm:` specifier. The feature that
  allows you to load commonjs npm modules.
- Because Deno Deploy did not work, and I wanted a live demo of my web app, I
  had to spend countless hours researching and testing alternatives. This was
  not productive.
- Many Node.js libraries and frameworks that appear to function end up having
  issues down the line This meant that I had to redo entire sections of the app
  when a specific things suddenly wouldn't work in my Deno environment.
- Database drivers, query builders, and ORM's are still kind of underdeveloped
  for the Deno runtime. My initial plan was to use Prisma, but for reasons
  stated above, it didn't work out. Instead, I opted for Mongoose. I've never
  used MongoDB and still have very little idea how it actually works.
- Preact is awsome, and this project only made me love it even more. The problem
  is that when I use a React based library, I am now using it through two
  compatability layers: Deno's NPM support, and Preacts compat layer.

Of course, even with all of the above roadblock, I perservered and stubbornly
pushed my way into creating a working web app.

Does this web app scale? Absolutely not. There is no recommendation algorithm
for posts. There is no pagination. I have no idea how to scale a MongoDB
database, but the way I'm interacting with it right now is for sure not going to
scale.

The web app is stateless, and I could load balance between servers without too
much concern, but that's about it.

Is this a good example of a Deno Fresh project? Again, no. This code base is
filled with repeated code, too much interactivity, and not enough thought
towards its architecture. If I were to start over with Deno Fresh and only Deno
based modules, I think I could do a much better job of leveraging Deno's "ship
no javascript by default" approach. As it is now, almost every component is an
island. That's definitely not using Fresh as intended.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

These are the major components of the web app.

- Deno
- Fresh
- Preact
- Twind (A Tailwind clone without a buildstep)
- JWT Auth
- MongoDB with Mongoose

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Make sure to clone or download the repo and follow the instructions in the next
sections.

### Prerequisites

Because this app uses Deno, the only real prerequisite is deno itself.

Learn how to install Deno on your machine here:
[Deno Install Manual](https://deno.land/manual@v1.32.1/getting_started/installation)

### Installation

Again, because this app uses Deno, all the code dependencies will automatically
install when running the start task.

However, the app does expect a .env file to be present in the root directory.

The .env file should define a `DATABASE_URI` field with an older MongoDB URI.
The newer style of MongoDB URI's do not work with Deno.

When getting your URI from MongoDB atlas, select the Node.js driver, but specify
the version as `2.2.12 or later`

This will generate an older style MongoDB URI that should work. Rule of thumb,
if your URI starts with `mongodb+srv://` instead of `mongodb://`, it's probably
not going to work.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

To start the app simply type `deno task start` from the root directory.

This will install all dependencies and cache them, which can take a while.

Once the dependencies have been installed, the app will start on
`localhost:8000`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Micheal Earl - [@michealearldev](https://twitter.com/michealearldev) -
michealearldev@gmail.com (I prefer email)

Project Link:
[https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

When making this project, I heavily referenced "Code with Antonio's" twitter
clone. His clone was made with Node, Next.js, and Prisma.

- [Code With Antonio](https://github.com/AntonioErdeljac)

I used a template for this README

- [Template](https://github.com/othneildrew/Best-README-Template#about-the-project)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/micheal-earl/
[product-screenshot]: static/thumb.png
