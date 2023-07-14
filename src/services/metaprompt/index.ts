/*
RECURSIVE ALERT
todo: redo the way ppl build llm apps (make themn sentient lol)
you should be able to have a conversation w/ an AI about the kind of AI you need to build.

features:
- AI prompt improvement / cloud prompts w. version control
- Model selector / upgrade
- vector DB / automated context creator
- multi layer prompts routing / nocode
- multi step workflows
- api integrations / serverless
- autoGPTs
- ML model selection 
*/
import { gradePrompt, improvePrompt, runPrompt } from '../langchain';

export const PromptInput = `
You are Parcero, a text-based language learning curriculum teacher.
   You must iso639-2="es" to a user native in iso639-2="en"
  ---
  Your mental model of the user's needs:
  Current Exercise: chat
  Potential Lesson Ideas:
  Thoughts about the user: I know nothing about the user.
  Summary of Session:
  ---
  Rules for your responses:
    * MUST formulate your own exercises for the user.
    * DO NOT ask the user what to work on.
    * DO NOT get distracted from the current exercise.
    * MUST respond in iso639-2="es" unless the user asks for something in iso639-2="en"
    * DO NOT use special characters like / - | but instead be formatted as natural language.
    * MUST verify the user's response for correctness.
    * DO NOT exceed 120 characters in your response.
    * MUST include in your responses:
      (1) A response to the user's previous message
      (2) A continuation of the current exercise framed as a follow-up language EXERCISE for the user

  ---
  Conversation history


  --New message---
  Student: Let's do a vocabulary building exercise.
  ---
  Parcero:`;

const LLMOutput = `
  ¡Hola! ¡Claro, vamos a hacer un ejercicio de construcción de vocabulario! ¿Hay alguna categoría de palabras específica en la que te gustaría trabajar?`;

const acceptance_test_criteria = `
    1. MUST formulate your own exercises for the user.
    2. DO NOT ask the user what to work on.
    3. DO NOT get distracted from the current exercise.
    4. MUST respond in iso639-2="es" unless the user asks for something in iso639-2="en"
    5. DO NOT use special characters like / - | but instead be formatted as natural language.
    6. MUST verify the user's response for correctness.
    7. DO NOT exceed 120 characters in your response.
    8. MUST include in your responses:
      (a) A response to the user's previous message
      (b) A continuation of the current exercise framed as a follow-up language EXERCISE for the user

`;

// cool name - HOLOPROMPT, HOLOBRAIN lol dot ai
export async function metaprompter(promptInput: string = PromptInput, llm_output: string = LLMOutput) {
  console.log('output', llm_output);
  const grades = await gradePrompt(promptInput, llm_output, acceptance_test_criteria);
  console.log('grades for prompt1.', promptInput, grades);
  const newPrompts = await improvePrompt(promptInput, llm_output, acceptance_test_criteria);
  for (const prompt of newPrompts) {
    const newPromptOutput = await runPrompt(prompt);
    console.log('ran prompt', prompt, newPromptOutput);
    const grades = await gradePrompt(prompt, newPromptOutput, acceptance_test_criteria);
    console.log('grades for prompt', prompt, grades);
    // todo: recurse on this baby
  }
}
