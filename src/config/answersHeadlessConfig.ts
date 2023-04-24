import { AnswersHeadlessProvider } from '@yext/answers-headless-react';

type HeadlessProviderProps = Parameters<typeof AnswersHeadlessProvider>[0];

export const answersHeadlessConfig: HeadlessProviderProps = {
  apiKey: '50706f70f096a4e7906985a583210869',
  experienceKey: 'solstice',
  locale: 'en',
  sessionTrackingEnabled: true
};