## Droide game

Battle droid game, named YVH, with a system of modules that communicates through HTTP API requests. The main module of the app is the target (enemy droid) selection to attack.

This node app implements the main module that will send a POST request to /radar endpoint with the information (JSON data) it receives from its environment and returns the coordinates of the visible target (JSON data) that must be destroyed.

An example of a POST body would be: 
```json
{"protocols":["avoid-mech"],"scan":[{"coordinates": {"x":0,"y":40},"enemies":{"type":"soldier","number":10}}]}
```

- **protocols** : a protocol or a list of protocols used to determine which of the following points must be attacked first

- **scan**: a list of points with the number of targets at that position and the following subvalues:
    - **coordinates**: x and y coordinates of the point
    - **enemies**: type of enemy `type` (soldier or mech) and their count `number`
    - **allies** (optional): number of allies in that position. If this value is missing, then there are no allies in the area

The answer must contain the x and y coordinates of the next point to destroy, like {"x":0,"y":40}

To determine which is the next point to destroy, the requested **protocols rules** must be taken into account.

### Available protocols

- **closest-enemies** : The closest point where there are enemies should be prioritized
- **furthest-enemies** : The furthest point where there are enemies should be prioritized
- **assist-allies** : Points where there is an ally should be prioritized
- **avoid-crossfire** : Do not attack any point where there are any allies
- **prioritize-mech** : A mech should be attacked if found. If not, any other type of target will be valid
- **avoid-mech** : No mech type enemies should be attacked

Various protocols may be provided in the request. For example, if both protocols, closest-enemies and assist-allies, are received, the app will search for the closest point that have allies.

In any case, compatible protocols will be provided. It can be assumed that the module will never receive the closest-enemies and furthest-enemies protocols in the same request.

Targets at a distance greater than 100m are considered too far away to be attacked and therefore should be ignored.
## Install

```bash
git clone git@github.com:girls-incode/droide-game.git
cd droide-game && npm i
```
## Usage

```bash
npm run build

# npm run start:development
# or development in watch mode: npm run dev
# npm run start:integration
npm run start:production

# run various scenarious defined in test_cases.txt
sudo ./tests.sh
```

## Run inside docker

Build the image:

```bash
docker build . \
--no-cache -t gis:droid-dev \ 
--target=development

# or
docker build . \
--no-cache -t gis:droid-integ \
--target=integration

# or 
docker build . \
--no-cache -t gis:droid-prod \ 
--target=production
```

Start the container:

```bash
docker run -p 8888:8888 gis:droid-integ 
```

Make API requests on `localhost:8888`, like:

```bash
# GET request on home should return 'YVH home'
curl -v localhost:8888
```

```bash
# Should return {"x":11,"y":35}
curl -X POST http://localhost:8888/radar \
-H 'Content-Type: application/json' \
-d '{"protocols":["furthest-enemies","avoid-mech"],"scan":[{"coordinates":{"x":89,"y":13},"enemies":{"type":"mech","number":1}},{"coordinates":{"x":11,"y":35},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":0,"y":11},"enemies":{"type":"mech","number":1}}]}'
```

```bash
# Execute multiple test cases
sudo ./tests.sh

# Will output
#Test 1 : [  OK  ]
#Test 2 : [  OK  ]
#Test 3 : [  OK  ]
#Test 4 : [  OK  ]
#Test 5 : [  OK  ]
#Test 6 : [  OK  ]
#Test 7 : [  OK  ]
#Test 8 : [  OK  ]
#Test 9 : [  OK  ]
#Test 10 : [  OK  ]
#Test 11 : [  OK  ]
#Test 12 : [  OK  ]
#Test 13 : [  OK  ]
```

## Test

```bash
npm run test
npm run test:coverage
```

## Code analysis

```bash
# eslint
npm run lint

# prettier
npm run format:checkall
npm run format:fixall
```

## Documentation

```bash
npm run compodoc:open
```

The generated documentation will be available at http://localhost:8080

## Swagger

Start the app in any environment:
```bash
npm run start:production
```

Test the API endpoints at http://localhost:8888/documentation/static/index.html
