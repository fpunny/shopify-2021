import Section from '../Section';
import Text from '../Text';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <Section className={styles.header}>
      <Text type='heading1'>The Shoppies</Text>
      <Text color='text-alt'>
        Movie awards for entrepreneurs. Select 5 nominees and join the party.
      </Text>
    </Section>
  );
}
