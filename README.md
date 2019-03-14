# generator-rct [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Scaffold React applications and its parts

## Installation

First, install [Yeoman](http://yeoman.io) and generator-rct using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-rct
```

Then generate your new project:

```bash
yo rct
```

## Getting To Know Yeoman

The generator generates TypeScript files with coresponding tests for following patterns:

### Componenets
React components
	- Class Component
	- SFC Component
	- PureComponent

### Containers
Smart React componet, uses connect and bindActionCreators

### Reducers
Redux reducers
	- main reducer uses the object mapping pattern instead of a switch
	- reducer function is meant to be connected to the main reducer
	
	```
	export const reducers: ReducerMap<State> = {
        [API_CONSTANTS.REPLACE]: replaceReducer,
        [API_CONSTANTS.UPDATE]: updateReducer,
        [API_CONSTANTS.DELETE]: deleteReducer,
        [API_CONSTANTS.ERROR]: errorReducer,
        [API_CONSTANTS.REQUEST]: requestReducer,
    };
    
    export const labelManagementReducer =
        (state: State = initialState, action: StandardAction<any>) =>
            getReducer<State>(reducers[action.type])(state, action);
	```
### Selectors
it creates a reselect selector file.	

### Actions
redux action file, we expect to have a createAction within the system either from the redux-actions package or a custom implementation

### Sagas
redux saga pattern with option to listen for takeEvery or takAll and an example test

### Function
If you follow the single file function pattern us this generater to avoid those 20 seconds of typing :)
