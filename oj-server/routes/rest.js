var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var problemService = require('../services/problemService');

router.get('/problems', function(req, res) {
    problemService.getProblems()
        .then(problems=> res.json(problems));
});

router.get('/problems/:id', function(req, res) {
    var id = req.params.id;
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});

router.post('/problems', jsonParser, function(req, res) {
    problemService.addProblem(req.body)
        .then(problem => {
            res.json(problem);
        },
        error => {
            res.status(400).send('problem name already exists');
        });
});
router.post('/build_and_run', jsonParser, function(req, res) {
    const userCode = req.body.userCode;
    const lang = req.body.lang;
    console.log('lang: ' + lang + '&&&& userCode: ' + userCode);

    // res.json({'text': 'hello from nodejs hahahaha'});
    restClient.methods.build_and_run(
        {
            data: {
                code: userCode,
                lang: lang
            },
            headers: { 'Content-Type': 'application/json'}
        }, (data, response) => {
            console.log('Received from execution server: ' + data);
            const text = `Build Ouput: ${data['build']}
            Execute ouput: ${data['run']}`;
            data['text'] = text;
            res.json(data);
        }
    );
});

module.exports = router;
