# OpenAI-Compatible LangChain Starter

Launch-ready examples for using LangChain with a custom OpenAI-compatible API endpoint.

This repo is for developers searching for:

- LangChain custom OpenAI endpoint
- ChatOpenAI baseURL
- OpenAI-compatible providers
- LangChain OpenAI-compatible base_url
- custom OpenAI API endpoint with LangChain

The JavaScript example uses the current LangChain JS `ChatOpenAI` pattern:

```js
const chat = new ChatOpenAI({
  apiKey: process.env.OPENAI_COMPATIBLE_API_KEY,
  model: process.env.OPENAI_COMPATIBLE_MODEL,
  configuration: {
    baseURL: process.env.OPENAI_COMPATIBLE_BASE_URL,
  },
});
```

Python users can use the equivalent `langchain_openai.ChatOpenAI` argument:

```python
from langchain_openai import ChatOpenAI

chat = ChatOpenAI(
    api_key=os.environ["OPENAI_COMPATIBLE_API_KEY"],
    model=os.environ["OPENAI_COMPATIBLE_MODEL"],
    base_url=os.environ["OPENAI_COMPATIBLE_BASE_URL"],
)
```

## Quick Start

```bash
npm install
cp .env.example .env
npm run check
npm run scan:secrets
node examples/chatopenai-custom-baseurl.js
```

Set these values in `.env`:

```bash
OPENAI_COMPATIBLE_API_KEY=your_provider_key
OPENAI_COMPATIBLE_BASE_URL=https://your-provider.example/v1
OPENAI_COMPATIBLE_MODEL=your-model-name
```

## Example Endpoint: TKEN

TKEN is included as a disclosed example of an OpenAI-compatible endpoint:

```bash
OPENAI_COMPATIBLE_BASE_URL=https://www.tken.shop/v1
```

Try TKEN here:

- [TKEN OpenAI-compatible endpoint](https://www.tken.shop/?utm_source=github&utm_medium=readme&utm_campaign=openai-compatible-langchain-starter&utm_content=primary-cta)
- [TKEN setup link](https://www.tken.shop/?utm_source=github&utm_medium=docs&utm_campaign=openai-compatible-langchain-starter&utm_content=setup)

The code remains portable: replace the base URL, API key, and model with any provider that follows the official OpenAI API request and response shape closely enough for LangChain.

## Compatibility Notes

LangChain's OpenAI integration targets the official OpenAI API shape. Many providers expose compatible `/v1` routes, but compatibility is not universal.

Important caveats:

- Use `configuration: { baseURL: "https://your-provider.com/v1" }` for LangChain JS `ChatOpenAI`.
- Use `base_url="https://your-provider.com/v1"` for Python `langchain_openai.ChatOpenAI`.
- Non-standard provider fields may not be preserved by LangChain's OpenAI wrapper.
- Provider-specific packages or SDKs can be a better choice when you need extra provider features, custom parameters, or non-OpenAI response fields.
- Model names, token limits, streaming behavior, tool calling, JSON mode, and embeddings support can vary by provider.

## Files

- `examples/chatopenai-custom-baseurl.js` - minimal LangChain JS custom `baseURL` example.
- `.env.example` - portable environment variables.
- `docs/setup.md` - setup and provider switching guide.
- `docs/troubleshooting.md` - common compatibility and request issues.
- `docs/utm-links.md` - disclosed TKEN CTA links with UTM parameters.
- `scripts/check.js` - local repo readiness check.
- `scripts/scan-secrets.js` - simple secret scan for accidental credentials.

## License

MIT
