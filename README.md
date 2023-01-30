# README

## Disclaimer

- UI Kit and theme part were copied from existing project and simplified thus I don't develop it for this task. As an alternative we can use any UI components lib.
- all configurations were also copied from an existing project and simplified, so you can find some lines of configuration that are not needed for that project but still nice to have for a real world application

all these parts were done 100% by myself in the past and are improving continuously when needed

## Run

To run local Webpack Dev server use a command bellow. Then open in a browser: `http://localhost:5051` to access the app.

```bash
yarn run:dev
```

## How to use

1. Open root URL (or any other - it will redirect you)
2. Write your review
3. Try to leave fields empty or invalid (e.g. email) to see validation in action
4. Submit a review
5. You should be redirected to `/results` where you can see your review being on top and a bunch of others added earlier
6. Also you can see rating distribution chart there
7. Resize browser window to see responsive layout in action

## Tests

To run tests:

```bash
yarn test
```

Normally for UI Kit we have unit tests and visual tests. I skipped them here since it's outside of a task context.

General thoughts about testing:

- I tested some atomic components with unit and visual tests (e.g. Rating)
- I tested flows with functional tests. Consider it the most effective way to test an app when you don't have resources/time to write properly all test levels
- We can also setup visual testing with puppeteer to make "real" screenshots. In practice I don't really like it because usually it's hard to maintain these tests but in some cases it can be useful (e.g. to test responsive layout)
- When we have BE we can introduce e2e tests. My personal preference is to test on mocks as much as possible because e2e tests can be too heavy especially for CI
- Also in real world we should write unit tests for controller level (e.g. domain hooks) to test business logic separately from presentation level
- Overall for that assignment we can add lots of tests for edge cases, visual tests e.g. to test responsive layout etc. I focused just on couple of examples of different types of tests otherwise I can be very time consuming. **Feel free to ask me to add any other tests you think it worth to have from the test assignment perspective.**

## About state management

Since it's pretty simple app I use just a local state within a parent with a dedicated abstraction level (`DataManager`) that handles all data operations and shares a state via context.

Depending on the app and requirements we can:

- keep using local state(s)
- add `mobx` states
- use cache with `react-query` (and face all the problems with cache invalidation)
- use `redux` (better not to) or any other library

or, most likely, do the combinations of the above options.

I thought about adding `localforage` to keep reviews there since we don't have BE but looks like it's not required and also not optimal time wise.

## About files structure

I describe here only main structure so it's easy to navigate. There are lots of details (e.g. how to do cross domains imports? or how our presentation and controller levels look like?) that can be discussed and must be discussed in the real world.

Main idea is that we split our app into business domains and keep all the related stuff inside each domain where the entry point of a domain contains it's types. At the same time it's very important to split an app into domains correctly and think how they will interact with each other.

0. All the configurations files and `typings` in root
1. `bundle` contains final build of a project
2. `locales` contains localisation files (you can run `yarn localise` to generate that files from source code)
3. `src` - all the project related files
4. `src/ui-kit` UI Kit and theme. In real world it will be a separate package.
5. `src/resources` all the assets such as favicon, CSS files, fonts etc.
6. `src/app` source code of an app itself
7. `app/domains` main business domains of your application. Here we have `Feedback` and `Error`
8. `app/hooks` and `app/utils` contains shared utilities for the app. In real world most of them will be moved to a separate package.
9. `app/config` some configuration to run the app e.g. routes, localisation etc.
10. `app/routes` routes object for `react-router`
11. `app/index.tsx` entrypoint for webpack + high level providers, dev tools etc.
12. `app/domains/<domain>` each domain (may) have the following pieces:
	1. `index.ts` contains domain types
	2. `components` just dumb shared atomic components for a domain
	3. `scenes` routes components (should be as short as possible). If possible it can also contain all the router manipulations such as navigate function calls
	4. `features` more complex components (can include API interaction) that can be logically considered as a feature of a domain
	5. `features/<feature>` contains all things needed for a feature e.g. components, utils, hooks.

## Nice to have

### Tech

1. Folders structure can be improved for a larger project but main idea remains the same.

2. UIKit components variant styles can be moved to a theme variants ideally in a bigger project, where we have more of them e.g. `h1, h2, h3` for headings and different size options for `Text`. For simplicity and readability and because we just have a single variant for each type I put everything in a styled component itself here.

3. Add accessability `aria-*` attributes (separate namespace for i18next).

4. I would add labels with red "*" for fields instead of doing it with placeholders in real app but here for the sake of speed I don't have labels and just do it with a placeholder.

5. All the BE related improvements if we have API to get reviews (can be discussed). Also, in that case, we should have a separate API endpoint to get chart's data rather than do it on client side.

6. Scroll can be improved in various ways. We can use `react-custom-scrollbars` to style scroll bar and `react-window` to improve performance while displaying big amount of reviews. If we use BE and want to have an infinite loading we can also use `react-query` with bi-directional loading.

7. Server side rendering

8. More tests :)

### UX

1. Callback on review submit e.g. green notification that says something like "Your review was submitted successfully"

2. Chart can be more pleasant. Animation, labels, tooltip with a number of reviewers etc.

3. Review item can be improved. E.g. we can add a date and user name there
