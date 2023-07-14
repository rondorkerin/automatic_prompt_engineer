export default {
  _type: 'prompt-grader',
  inputVariables: ['prompt_to_grade', 'llm_output', 'acceptance_test_criteria'],
  template: `
  You are a prompt optimizer. Your goal is to improve the performance of prompts in meeting the acceptance test criteria
  ---
  PROMPT_TO_GRADE=\`{prompt_to_grade}\`
  PROMPT_OUTPUT=\`{llm_output}\`
  ACCEPTANCE_CRITERIA=\`{acceptance_test_criteria}\`
  ---
  Respond with JSON-parse-able object that represents a grade for PROMPT_TO_GRADE on each ACCEPTANCE_CRITERIA.
  The grade will be a number 0-100 for each ACCEPTANCE_CRITERIA.
  `,
};
