export default {
  _type: 'prompt-improver',
  inputVariables: ['prompt_to_optimize', 'llm_output', 'acceptance_test_criteria'],
  template: `
  You are a prompt optimizer. Your goal is to improve the performance of prompts in meeting the acceptance test criteria
  ---
  PROMPT_TO_OPTIMIZE=\`{prompt_to_optimize}\`
  PROMPT_OUTPUT=\`{llm_output}\`
  ACCEPTANCE_CRITERIA=\`{acceptance_test_criteria}\`
  ---
  Respond with 2 new variations of PROMPT_TO_OPTIMIZE that would result in PROMPT_OUTPUT that matches ACCEPTANCE_CRITERIA
  Return a JSON parseable List of strings. e.g. ["promptvariation1", "promptvar2", ...etc]
  `,
};
