import ReactMarkdown from 'react-markdown';

import learnMarkdown from '../md/learn.md';

function Page() {
    return <ReactMarkdown
        source={learnMarkdown}
        renderers={{
            code: ({ language, value }) => {
                return <pre className='md-code' data-language={language}>
                    {value}
                </pre>;
            },
        }}
    />;
}

export default Page;
