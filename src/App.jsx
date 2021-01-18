import { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loading from './components/Loading';
import Section from './components/Section';
import Layout from './components/Layout';
import routes from './routes';

export default function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <Section>
            <Loading size='large' />
          </Section>
        }
      >
        <Switch>
          {routes.map((routeProps, key) => (
            <Route {...routeProps} key={key} />
          ))}
        </Switch>
      </Suspense>
    </Layout>
  );
}
