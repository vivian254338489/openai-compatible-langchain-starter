# Setup

This project shows the simplest portable way to point LangChain at an OpenAI-compatible chat endpoint.

## Requirements

- Node.js 18 or newer
- An API key from your selected provider
- A provider base URL that ends in `/v1`
- A model name supported by that provider

## Install

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```bash
OPENAI_COMPATIBLE_API_KEY=your_provider_key
OPENAI_COMPATIBLE_BASE_URL=https://your-provider.example/v1
OPENAI_COMPATIBLE_MODEL=your-model-name
```

Run checks:

```bash
npm run check
npm run scan:secrets
```

Run the example:

```bash
node examples/chatopenai-custom-baseurl.js
```

## LangChain JS

Use `configuration.baseURL` with `@langchain/openai`:

```js
const chat = new ChatOpenAI({
  apiKey,
  model,
  configuration: {
    baseURL: "https://your-provider.com/v1",
  },
});
```

## LangChain Python

Python projects using `langchain_openai` use `base_url`:

```python
import os
from langchain_openai import ChatOpenAI

chat = ChatOpenAI(
    api_key=os.environ["OPENAI_COMPATIBLE_API_KEY"],
    model="your-model",
    base_url="https://your-provider.com/v1",
)
```

## TKEN Example

TKEN is one disclosed example endpoint:

```bash
OPENAI_COMPATIBLE_BASE_URL=https://www.tken.shop/v1
```

CTA links:

- [Visit TKEN](https://www.tken.shop/?utm_source=github&utm_medium=docs&utm_campaign=openai-compatible-langchain-starter&utm_content=setup-guide)
- [TKEN OpenAI-compatible API example](https://www.tken.shop/?utm_source=github&utm_medium=example&utm_campaign=openai-compatible-langchain-starter&utm_content=baseurl)

## Portability

The example is intentionally small. Swap only the environment variables when moving between OpenAI-compatible providers.

Avoid provider-specific request fields in this starter. LangChain's OpenAI wrapper targets the official OpenAI API shape, so custom provider fields may not pass through or may behave differently. If a provider exposes important extra features, compare this starter with that provider's official LangChain package, SDK, or documentation.
