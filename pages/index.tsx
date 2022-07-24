import type { NextPage } from 'next';
import {
  Button,
  Select,
  Transition,
  Modal,
  List,
  Text,
  Affix,
} from '@mantine/core';
import Link from 'next/link';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { BrandGithub } from 'tabler-icons-react';
import styles from '../styles/Home.module.css';
import servers from 'servers.json';

const Home: NextPage = () => {
  const [openedModal, setOpenedModal] = useState(false);
  const [country, setCountry] = useState<string | null>('');
  const ref = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    (async () => {
      const res = await (await fetch('/api/geo')).json();
      const server = servers.find((s) => s.cc === res.country);
      if (server) {
        ref.current.placeholder = server.country;
        setCountry(server.country);
      } else {
        ref.current.placeholder = servers[0].country;
        setOpenedModal(true);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Affix position={{ top: 20, right: 20 }}>
        <Button
          variant="light"
          component="a"
          href="https://github.com/retaps/find-bros"
          target={'_blank'}
        >
          <BrandGithub />
        </Button>
      </Affix>

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
          onChange={setCountry}
          label="Type your country here"
          defaultValue={country}
          styles={{
            rightSection: { pointerEvents: 'none' },
            input: { cursor: 'pointer' },
          }}
          data={servers.map((s) => ({
            ...s,
            value: s.country,
            label: s.country,
          }))}
        />

        <Transition
          mounted={!!country?.length}
          transition={'skew-up'}
          timingFunction={'ease'}
          duration={200}
        >
          {(styles) => (
            <Link
              href={servers.find((s) => s.country === country)?.invite || 'tmp'}
            >
              <Button style={styles} variant={'light'}>
                Join server for {country}
              </Button>
            </Link>
          )}
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
