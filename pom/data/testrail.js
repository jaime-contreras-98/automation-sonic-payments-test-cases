import http from "http";

let runId = 53998;

export const createTestRun = () => {

    executeRequest("/simulator/createTesRun").then(r => true)
    console.log("Create test run successfully")
}

export const executeRequest = (path, data) => {
    return new Promise(resolve => {
        const options = {
            hostname: 'localhost',
            port:     9024,
            path:     path,
            method:   'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        data = JSON.stringify(data)

        if(data != undefined && data != null){
            options.headers = {
                'Content-Length': data.length,
                'Content-Type': 'application/json'
            }
        }

        const req = http.request(options, res => {
            res.setEncoding('utf8');
            res.on('data', function (response) {
                response = JSON.parse(response)
                if(response.status == true){
                    if(path === "/simulator/createTesRun"){
                        runId = response.runId
                    }

                }

            });
            resolve();
        });

        req.on('error', e => {
            console.error(e);
        });

        if(data != undefined && data != null) {
            req.write(data);
        }

        req.end();
    });
};

export const updateTesCaseStatus = (data) => {
    console.log("Update TestRail test case " + data.testCaseId + " with status: " + data.status)
    data.runId = runId
    executeRequest("/simulator/updateTesCaseStatus", data).then(r => true)

}