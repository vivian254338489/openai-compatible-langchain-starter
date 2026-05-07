# Troubleshooting

## 401 or 403 Authentication Errors

Check that `OPENAI_COMPATIBLE_API_KEY` is set and belongs to the same provider as `OPENAI_COMPATIBLE_BASE_URL`.

## 404 Endpoint Errors

Most OpenAI-compatible providers expect a base URL ending in `/v1`.

Use:

```bash
OPENAI_COMPATIBLE_BASE_URL=https://your-provider.com/v1
```

Avoid:

```bash
OPENAI_COMPATIBLE_BASE_URL=https://your-provider.com/v1/chat/completions
```

LangChain adds the chat completions path internally.

## Unknown Model Errors

Set `OPENAI_COMPATIBLE_MODEL` to a model name your provider supports. Model names are provider-specific even when the HTTP API is OpenAI-compatible.

## Provider-Specific Features Do Not Work

LangChain's OpenAI integration targets the official OpenAI API shape. Non-standard provider fields may not be preserved by the OpenAI wrapper.

Use a provider-specific package or SDK when you need:

- custom provider parameters
- non-standard response fields
- special routing controls
- provider-native tool calling features
- advanced billing, caching, or safety controls

## Streaming or Tool Calling Differs

OpenAI-compatible does not guarantee identical streaming chunks, tool-call behavior, JSON mode, or usage metadata. Test the exact model and provider path you plan to run in production.

## TKEN Endpoint Check

For TKEN, set:

```bash
OPENAI_COMPATIBLE_BASE_URL=https://www.tken.shop/v1
```

Then use a model and API key from TKEN. Visit [TKEN](https://www.tken.shop/?utm_source=github&utm_medium=docs&utm_campaign=openai-compatible-langchain-starter&utm_content=troubleshooting) for provider details.
