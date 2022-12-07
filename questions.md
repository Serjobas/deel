1)What is the difference between Component and PureComponent? give an
   example where it might break my app. 
   

PureComponent implements `shouldComponentUpdate` with a shallow comparison of new props and state to the old props and state. This may break our app in many cases such as:
   


* Worsening the performance if misused e.g when using PureComponent everywhere and not in exact places where the optimization is needed. It will be comparing the props & state on every render (unnecessary additional calculations) and will be rendered anyway.
* App will not be able to re-render if the props or state is an object or an array and the value changed, but the reference is not, so shallow compare couldn't detect the change => PureComponent won't rerender

___
2.Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?

If Context used with PureComponents and change of Context value is happening, the PureComponents will not be re-rendered because the props and state are not changed. So re-render won't happen on PureCompoent and it's children.

___
3.Describe 3 ways to pass information from a component to its PARENT.

1. Using Props (callback function or ref.current). Create a callback function in the parent and pass it as a prop to the child. The child will call the function and pass the data to the parent. Same with refs, 
2. Using Context. Create a Context and access it from the child component. The child will update the Context value and the parent will be able to access the value.
3. Using a state-manager (Redux): Create a store and dispatch an action from the child component. The parent will be able to access the store and the state.
___
4.Give 2 ways to prevent components from re-rendering.

1. Using `shouldComponentUpdate` in Class Components, and return false if the props or state are not changed.
2. Using `React.memo(Component, compareFn)` in Functional Components and pass the component and compare function as arguments.  
___
5.What is a fragment and why do we need it? Give an example where it might break my app.

Fragment is a way to group a list of children without adding extra nodes to the DOM. It's useful when we want to return multiple elements from a component. Not sure about cases when it might break the app.
___
6.Give 3 examples of the HOC pattern.

1. `withRouter` from `react-router-dom` HOC that passes the `history`, `location` the wrapped component.
2. `connect` from `react-redux` HOC that connects a React component to a Redux store.
3. `withStyles` from `@material-ui/core` HOC that injects CSS into the DOM.

btw, my opinion is that HOC is not a straightforward and good way of reusing the logic, there are some reasons.    
1) It needs a lot of boilerplate code, and your own HOCs are not very readable.
2) It's not clear what props are passed to the wrapped component.
3) It's usually placed at the end of the wrapped component, so it's getting really messy

when hooks were introduced, it was a game changer, and I personally use hooks a lot for reusing logic (almost never happened to me with HOCs)
___
7.what's the difference in handling exceptions in promises, callbacks and
   async...await.

1. In promises we use `.catch` to handle the error. We can take advantage of chaining to handle the error in the next `.then` or `.catch`. 
   ```js
    fetch('https://error')
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      }).then(() => {
        console.log('done');
        throw new Error('error');
      }).catch((error) => {
        console.log('second', error);
      });
    ```
   
2. In callbacks we usually pass handle error function as arguments
   ```js
   // we're creating a promise but it's a good example of handling erros in callback (reject fn)
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('error');
      }, 1000);
    })
    ```
   
3. In async...await we use try...catch
   ```js
   async function getData() {
      try {
        const data = await fetch('https://error');
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    ```
___ 
8.How many arguments does setState take and why is it async.

`this.setState(updater, callback)`

takes 2 arguments. The first argument is the updater function, and the second argument is the callback function. 
The updater function takes the previous state as an argument and returns an object with the new state. Updater also can be a plain object.
The callback function is called after the state is updated and the component is re-rendered.

`const [state, setState] = useState(initialState)`

this `setState` takes only Updater function or value that needed to be updated 


setState triggers re-rendering. It can be expensive on large trees and so freeze the UI. So it's async to prevent blocking the main thread.

___

9.List the steps needed to migrate a Class to Function Component.

1. Rewrite Class Components syntax to Functional Components syntax: remove `extends Component` and `render` method, remove `this` keyword.
2. Rewrite from `setState` to `useState` hook, `refs` to `useRef`.
3. Migrate lifecycle methods to useEffect hook.
4. Reuse logic with custom hooks.
5. Take advantage of `React.memo` and `useCallback` hooks. if you used `PureComponent` or `shouldComponentUpdate` before

___
10.List a few ways styles can be used with components.

1. Inline styles `style={{color: 'red'}}`
2. CSS files `import './style.css'` `<Component className="button" />`
3. CSS-in-JS (styled-components, emotion, etc) `import styled from 'styled-components'` `const Button = styled.button` `color: red;` ``
4. CSS Modules `import styles from './style.module.css'` `<Component className={styles.button} />`

___
11.How to render an HTML string coming from the server.

Using `dangerouslySetInnerHTML` prop, but wee need to make sure that HTML is sanitized and trusted in order to prevent XSS attacks.  
```js
<div dangerouslySetInnerHTML={{ __html: '<h1>HTML</h1>' }} />
```

