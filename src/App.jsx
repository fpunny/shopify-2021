import { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './routes';

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map((routeProps, key) => (
            <Route {...routeProps} key={key} />
          ))}
        </Switch>
      </Suspense>
    </Layout>
  );
}
