#!/usr/bin/env node
var Rx = require('rx');
var _ = require('underscore');

function createData() {
    var data = {
        batch: createBatch(),
        systemInfo: systemInfo(),
        durationHistory: durationHistory(),
        sentToQDBHistory: sentToQDBHistory(),
        filteredSeenBeforeHistory: filteredSeenBeforeHistory(),
        numberOfJobsFailedHistory: numberOfJobsFailedHistory(),
        httpSentHistory: httpSentHistory(),
        httpErrorHistory: httpErrorHistory()
    };
    return Rx.Observable.just(data)
        .flatMap(function (data) {
            var batch = data.batch;
            var list = [];
            while (batch.numberOfJobsCompleted < batch.numberOfJobs) {
                batch = createBatch(batch);
                list.push({
                    batch: batch,
                    systemInfo: systemInfo(),
                    durationHistory: durationHistory(),
                    sentToQDBHistory: sentToQDBHistory(),
                    filteredSeenBeforeHistory: filteredSeenBeforeHistory(),
                    numberOfJobsFailedHistory: numberOfJobsFailedHistory(),
                    httpSentHistory: httpSentHistory(),
                    httpErrorHistory: httpErrorHistory()
                })
            }
            return Rx.Observable.from(list);
        })
        .flatMap(function (data) {
            if (data.batch.numberOfJobs === data.batch.numberOfJobsCompleted) {
                data.batch.batchStatus = 'Completed';
            }
            return Rx.Observable.just(data)
        });
}

function createBatch(batch) {
    if (batch !== undefined) {
        var clone = _.clone(batch);
        clone.numberOfJobsCompleted = incr(batch.numberOfJobsCompleted, batch.numberOfJobs);
        clone.numberOfJobsFailed = incr(batch.numberOfJobsFailed, 35);
        clone.sentToQDB = incr(batch.sentToQDB, 5024);
        clone.filteredSeenBefore = incr(batch.filteredSeenBefore, 10245);
        clone.numberOfPosts = incr(batch.numberOfPosts, 10000);
        clone.numberOfComments = incr(batch.numberOfComments, 5000);
        clone.numberOfCommentsOnComments = incr(batch.numberOfCommentsOnComments, 1000);
        clone.httpRequestPerSecond = incr(batch.httpRequestPerSecond, 3.6);

        return clone;
    } else {
        return {
            batchId: 1,
            batchStatus: "Running",
            startDate: new Date().getTime(),
            sentToQDB: 0,
            filteredSeenBefore: 0,
            numberOfJobs: 700,
            numberOfJobsCompleted: 0,
            numberOfJobsFailed: 0,
            numberOfPosts: 0,
            numberOfComments: 0,
            numberOfCommentsOnComments: 0,
            httpRequestPerSecond: 0
        }
    }
}

function incr(curr, max) {
    var s = max / 100;
    var ans = curr + s;
    if (ans >= max) ans = max;
    return ans;
}

function systemInfo() {
    return {
        batchLimit: 0,
        jobLimit: 5,
        loopEnabled: false,
        qdbEnabled: true,
        httpLimit: 5.00
    };
}

function durationHistory() {
    return [4, 6, 7, 8, 9, 5, 3, 6, 5, 6, 7, 5, 7, 7, 7, 7];
}

function sentToQDBHistory() {
    return [4, 6, 7, 8, 9, 5, 3, 6, 5, 6, 7, 5, 7, 2, 7, 9];
}

function filteredSeenBeforeHistory() {
    return [4, 6, 7, 8, 9, 5, 3, 6, 5, 6, 7, 5, 7, 2, 7, 2];
}

function numberOfJobsFailedHistory() {
    return [4, 6, 7, 8, 9, 5, 3, 6, 5, 6, 7, 5, 7, 9, 7, 5];
}

function httpSentHistory() {
    return [[1, 14], [2, 15], [3, 18], [4, 16], [5, 19], [6, 17], [7, 15], [8, 16], [9, 20], [10, 16], [11, 18], [12, 18]];
}

function httpErrorHistory() {
    return [[1, 5], [2, 8], [3, 14], [4, 6], [5, 8], [6, 10], [7, 13], [8, 0], [9, 13], [10, 10], [11, 3], [12, 3]];
}

var DataGenerator = {};
DataGenerator.createData = createData;

module.exports = DataGenerator;
