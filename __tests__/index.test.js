import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import HomePage from '../pages/index';

const server = setupServer(
    rest.get(
      "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                response: {
                  docs: [
                    {
                      lead_paragraph:
                        'The idea was simple: Why throw away used rapid antigen test kits for the coronavirus when they could be used again and again?',
                      web_url:
                        'https://www.nytimes.com/2021/05/01/world/indonesia-covid-swabs-reused.html',
                      headline: {
                        main:
                          'In Indonesia, lab workers are arrested and accused of reusing nasal swabs in thousands of coronavirus tests.',
                      },
                    },
                  ],
                },
            })
        );
      }
    )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('success search article with query indonesia', async () => {
    const { getByLabelText } = render(<HomePage />);
    fireEvent.change(getByLabelText("search google maps"), {
        target: { value: 'indonesia' },
    })
    fireEvent.click(getByLabelText('search'));
    await waitFor(() => screen.getByRole('article'));
    expect(screen.getByRole('article')).toHaveTextContent('The idea was simple: Why throw away used rapid antigen test kits for the coronavirus when they could be used again and again?')
});
