import { FaExternalLinkAlt } from "react-icons/fa";
import Text from "../Text";
import Button from '../Button';
import Section from '../Section';
import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <Section className={styles.container} tag='footer'>
            <Text type='meta1' className={styles.author}>
                Made with ❤ by Frederic Pun
            </Text>
            <Button
                rightIcon={FaExternalLinkAlt}
                color='text-alt'
                linkProps={{
                    href: 'https://github.com/fpunny/shopify-2021',
                    target: '_blank',
                    rel: 'noreferrer noopener',
                }}
                type='ghost'
            >
                Source Code
            </Button>
        </Section>
    )
}