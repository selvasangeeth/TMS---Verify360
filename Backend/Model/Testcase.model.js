const TestCaseSchema = new mongoose.Schema({
  testCaseName: {
    type: String,
    required: true,
  },
  testCaseId: {
    type: String,
    required: true,
  },
  caseType: {
    type: String,
    required: true

  },
  expectedResult :{
      type : String,
  },
  testCaseData: {
    type: String,
  },
  steps: {
    type: String,
  },
  status: {
    type: String,
    default: null

  },
  comments: {
    type: String,
  },
  reference: {
    type : String,

  },
  testRegion :{
        type :String,
  },
  bugReferenceId: {
    type: String,

  },
  bugPriority: {
    type: String,
  },
  testRegion: {
    type: String,
  },
  scenario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "scenario"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  testCaseDescription: {
    type: String,
    required: true

  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  testedBy: [
    {
      testerName: {
        type: "string",
      },
      testDate: {
        type: "Date",
        value: new Date().toISOString()
      }
    }
  ]
});

module.exports = mongoose.model('Testcase', TestCaseSchema);


