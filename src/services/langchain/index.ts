import { OpenAI } from 'langchain/llms';

import thoughtContextFile, { parseThoughtContext } from './prompts/new/thought-context';
import quickResponseFile from './prompts/new/quick-response';
import promptImproverFile from './prompts/metaprompt/prompt-improver';
import promptGraderFile from './prompts/metaprompt/prompt-grader';

import { PromptTemplate } from 'langchain/prompts';
import promptGrader from './prompts/metaprompt/prompt-grader';

export const DefaultThoughtContext: ThoughtContext = {
  lessonFlow: 'chat',
  lessonPlan: [],
  thoughts: 'I know nothing about the user.',
  summary: '',
};

export interface ThoughtContext {
  lessonFlow: string;
  lessonPlan: string[];
  thoughts: string;
  summary: string;
}

export interface ThoughtContextResponse {
  thoughtContext: ThoughtContext;
}

export const gpt4 = new OpenAI({
  modelName: 'gpt-4',
  temperature: 1,
  openAIApiKey: process.env.OPENAI_KEY,
});

export const gpt3 = new OpenAI({
  modelName: 'gpt-3.5-turbo',
  temperature: 1,
  openAIApiKey: process.env.OPENAI_KEY,
});

export const gpt4Big = new OpenAI({
  modelName: 'gpt-4-32k',
  temperature: 1,
  openAIApiKey: process.env.OPENAI_KEY,
});

export const gpt3Big = new OpenAI({
  modelName: 'gpt-3.5-turbo-16k',
  temperature: 1,
  openAIApiKey: process.env.OPENAI_KEY,
});

export async function improvePrompt(prompt_to_optimize: string, llm_output: string, acceptance_test_criteria: string) {
  const promptImproverPrompt = new PromptTemplate(promptImproverFile);
  const formattedPrompt = await promptImproverPrompt.format({ prompt_to_optimize, llm_output, acceptance_test_criteria });
  console.log('optimize prompt:', formattedPrompt);
  const languageModel = gpt4;
  const responseText = await languageModel.call(formattedPrompt);
  console.log('optimized prompts', responseText);
  return JSON.parse(responseText);
}

export async function runPrompt(prompt: string) {
  console.log('running live prompt:', prompt);
  const languageModel = gpt3;
  const responseText = await languageModel.call(prompt);
  return responseText;
}

export async function gradePrompt(prompt_to_grade: string, llm_output: string, acceptance_test_criteria: string) {
  const promptGraderPrompt = new PromptTemplate(promptGraderFile);
  const formattedPrompt = await promptGraderPrompt.format({ prompt_to_grade, llm_output, acceptance_test_criteria });
  console.log('grading prompt:', formattedPrompt);
  const languageModel = gpt4;
  const responseText = await languageModel.call(formattedPrompt);
  console.log('graded prompt', responseText);
  return JSON.parse(responseText);
}
