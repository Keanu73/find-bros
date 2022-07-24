import type { NextPage } from 'next';

import Link from 'next/link';

import {
  Button,
  Select,
  Transition,
  Modal,
  List,
  Text,
  Affix,
  Group,
  Notification,
  Stack,
} from '@mantine/core';

import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { BrandDiscord, BrandGithub, MapSearch } from 'tabler-icons-react';

import styles from '../styles/Home.module.css';
import servers from 'servers.json';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  cc: string;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, cc, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <picture>
          <source src={`/flags/${cc}.png`} type="image/png"></source>
          <img
            src={`/flags/${cc}.png`}
            width={'24px'}
            alt={`${label} flag`}
          ></img>
        </picture>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {cc.toUpperCase()}
          </Text>
        </div>
      </Group>
    </div>
  )
);

SelectItem.displayName = 'SelectItem';

const Home: NextPage = () => {
  const [openedModal, setOpenedModal] = useState(false);
  const [openedNotification, setOpenedNotification] = useState(true);
  const [country, setCountry] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    (async () => {
      const res = await (await fetch('/api/geo')).json();
      const server =
        servers.find((s) => s.cc === res.region) || // First find by country-region
        servers.find((s) => s.cc.split('-')[0] === res.country); // Then find by country if no results

      if (server) {
        ref.current.placeholder = server.country;
        setCountry(server.country);
      } else {
        setOpenedModal(true);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Affix position={{ top: 20, right: 20 }}>
        <Group>
          <Button
            variant="light"
            component="a"
            href="https://github.com/retaps/find-bros"
            target={'_blank'}
          >
            <BrandGithub />
          </Button>
          <Button
            variant="light"
            component="a"
            href="https://discord.gg/hamza"
            target={'_blank'}
          >
            <BrandDiscord />
          </Button>
        </Group>
      </Affix>

      <Transition
        mounted={openedNotification}
        transition={'slide-down'}
        timingFunction={'ease'}
        duration={200}
      >
        {(tstyle) => (
          <Affix style={tstyle} position={{ top: 20, right: 20 }}>
            <Notification
              sx={{
                width: '350px',
                maxWidth: '100%',
              }}
              title="Hamza's Cult"
              onClose={() => setOpenedNotification(false)}
            >
              <Stack>
                {
                  "We're a community of motivated and driven individuals working to achieve our goals."
                }
                <Button
                  variant="subtle"
                  component="a"
                  href="https://discord.gg/hamza"
                  target={'_blank'}
                  leftIcon={<BrandDiscord />}
                >
                  Join Us
                </Button>
              </Stack>
            </Notification>
          </Affix>
        )}
      </Transition>

      <Modal
        centered
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title="Country not found!"
        size={'lg'}
      >
        <Text>
          {
            "Sadly we don't have servers for every country as of now, but we would greatly appreciate it if you created one for yours."
          }
          <br />
          <br />
          {"Here's the steps you can follow if you choose to do so:"}
        </Text>

        <List mt={'xl'}>
          <List.Item>
            Create a server using the following{' '}
            <a href="https://discord.com/template/2AAUGBqBm3Nm">template</a>.
          </List.Item>
          <List.Item>
            Contact <b>Agro7#0007</b> or <b>felixsx#9501</b> on Discord so we
            can add your server to the list.
          </List.Item>
        </List>
      </Modal>

      <main className={styles.main}>
        <Select
          className={styles.search}
          ref={ref}
          searchable
          clearable
          creatable
          onChange={setCountry}
          onCreate={() => setOpenedModal(true)}
          getCreateLabel={(query) => `+ ${query}`}
          icon={<MapSearch />}
          label="Type your country here"
          defaultValue={country}
          styles={{
            input: { cursor: 'pointer' },
          }}
          data={servers.map((s) => ({
            ...s,
            value: s.country,
            label: s.country,
          }))}
          itemComponent={SelectItem}
        />

        <Transition
          mounted={!!country?.length}
          transition={'skew-up'}
          timingFunction={'ease'}
          duration={200}
        >
          {(tstyles) => {
            const c = servers.find((s) => s.country === country) || servers[0];
            return (
              <Link href={c.invite}>
                <Button style={tstyles} variant={'light'}>
                  Join server for {c.country}
                </Button>
              </Link>
            );
          }}
        </Transition>
      </main>

      <footer className={styles.footer}>
        <Button
          color={'red'}
          variant="outline"
          onClick={() => setOpenedModal(true)}
        >
          {"Can't find your country?"}
        </Button>

        <Text
          my={'md'}
          sx={(theme) => ({
            color: theme.colors.gray[5],
          })}
        >
          (c) retaps, 2022 // felixsx#9501
        </Text>
      </footer>
    </div>
  );
};

export default Home;
