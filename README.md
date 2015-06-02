# Evasion
a wordpress-like project in node.js !


This is a project who consist in creating a wordpress-like env' in node.js with a mongodb database.

if you want to use it, you can contact me at this address : t.chezieres@gmail.com

!!! Update on June 2th 2015 !!!

So, now, you can use it !

First you need to install Mongodb (launch it in the Terminal with "mongod" command)

Second, you need to Install Node.js, If you are on Windows or Mac, you can download it directly from the official website. On linux You have to type "sudo apt-get install nodejs" (notice that if the third operation is not working, you must do "sudo apt-get install nodejs-legacy" !).

Third you have to launch the Node.JS server, you have to go into the master branch of the project's folder and type "node app.js"

Now you have to type "localhost:8080" on your browser, click on "Rejoindre l'équipe", once that was done, you need to activate you account, go into your terminal, type "sudo mongo", next, you have to select your database, type "use evasion" and finally type this : "db.admins.update({ username : 'theusernameyoutyped' }, { $set : { active : true } })"

And now, you can connect on the website click on "Connexion" type your username and your password, and you migth be able to write articles on clicking in "Rédiger un article".

Some tips : 

- You have to type a title for your article
- The first file upload is for an icon you can send wich will represent your article on the homepage
- Type you article, if you need to show pictures on your article you have yo write like this:
Example : for the first picture of the article write %img1%.
for the 10th picture write %img10%
-After this, you can upload your pictures, upload it IN THE ORDER that you want them to appear ! (if you want to add one more page, click on the "Images++" button).
Once you did that, click on "Envoyer" and you will see be redirected to the Homepage and normally, your article must be there ! Click on the blue button to read it !

!!! This project isn't finished, I am working on it when I have the time, send a report if you see a bug ;) !!!
