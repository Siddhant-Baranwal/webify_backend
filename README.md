# Webify: 
A site for learning web development for the beginners. 
This is the backend repo of the project. 
[Link](https://github.com/Siddhant-Baranwal/webify_frontend.git) to the frontend repo.
[This](https://webify-gold.vercel.app/) is the actual site

## Idea:
The basic idea of this website is to give the beginners a platform where they get the roadmap for full-stack web development. Morever, they get the videos and documentation of each of the topics. For backend, we have added a donate page where user can donate us his desired amount. And another page for requesting a free counselling class on our site.

## Implementation and Tech Stacks used:
The basic backend is implemented using NodeJS, ExpressJS and MongoDB. 
For the payment gateway, we have used [Razorpay](https://razorpay.com/).

## Use the project on your PC:
First of all, clone the repo in your PC.
Then, you have to run the following command in the terminal :
```bash
npm i
```

Then, you have to create a .env file in the same folder with the following text in it:
```python
MONGO_URI = mongoDB server link

PORT = desired Port

FRONTEND_URL = URL of the frontend, to be used while integration

RAZORPAY_API_KEY = your razorpay API key

RAZORPAY_API_SECRET = your razorpay API secret
```

## Our team:
Siddhant Baranwal - Full-stack developer