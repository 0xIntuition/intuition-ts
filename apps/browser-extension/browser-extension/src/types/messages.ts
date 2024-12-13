// Message types for extension communication
export interface ExtractContentMessage {
  type: 'EXTRACT_CONTENT';
}

export interface AnalyzeContentMessage {
  type: 'ANALYZE_CONTENT';
  content: string;
  metadata?: ContentMetadata;
}

export interface GetSummaryMessage {
  type: 'GET_SUMMARY';
}

export type ExtensionMessage = ExtractContentMessage | AnalyzeContentMessage | GetSummaryMessage;

export interface ContentMetadata {
  url: string;
  title: string;
  contentType: string;
  ogType?: string;
}

export interface ContentResponse {
  content?: string;
  metadata: ContentMetadata;
  error?: string;
  source?: 'jina' | 'dom';
}

export interface SummaryResponse {
  summary?: string;
  error?: string;
  source?: 'jina' | 'dom';
}
