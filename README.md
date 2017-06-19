# pokemons list

## The API  
This site is using pokemon API.  
It's available here: <https://pokeapi.co/>.  

## The Site
You like Pokemons, you'll find something for yourself here:  
<https://dom-void.github.io/pokemon/>.  

## The Goals (or tasks)  
A few goals were given to me:  
1. Create a table based on a CSS framework or your own styles. `[done]` 
2. List Pokemons available in the game: `[done]`  
a. Table should contain at least 10 Pokemons, `[done]`  
b. Columns should include Pokemon’s image, name, HP, `[done]`  
c. Table should have some sort of pagination. `[done]`  
3. Images should rotate on mouse hover. `[done]`  
4. Create a separate page with Pokemon’s details containing:  
a. Pokemon’s speed, attack, defence stats,  
b. Reference to it’s evolution forms.  
5. Add at least one unit/integration test.  

## What I have done untill now
- I used `AJAX` to request data from `JSON` `API` server.
- Code is written in `ECMAScript5` (for a good start).
- At first it takes number of all Pokemons available in `API` (in case it's gonna change one day).
- Next `API` request creates `array` with all Pokemons' names and its `url`s.
- After that the table is fullfilled for a first time, buttons are activated and page status is showen. Now you can use the page (change the pages in fact).
- Images rolls after mouse over.
- Next and prev buttons work in a carousel (ie. previous to first is last page).
- If there's less elements on the last page, the table is shorter.
- I used `jQuery` in the code.
- I used `w3.css` to style some elements.

## What I want to do more
- Modal page linked for every Pokemon on the list, contains: speed, attack and defence stats.
- The same modal page will contain reference to Pokemon's evolotion forms (not sure what is that in fact).
- Accumulate more knowledge about unit and integration tests.
- I won't sleep 'till it works in `React`.
