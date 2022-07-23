import type { NextPage } from 'next';
import { Button, Select, Transition, Modal, List, Text } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import servers from 'servers.json';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

const Home: NextPage = () => {
  const [openedModal, setOpenedModal] = useState(false);
  const [country, setCountry] = useState<string | null>('');
  const ref = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    (async () => {
      const res = await (await fetch('/api/geo')).json();
      ref.current.placeholder = res.country;
    })();
  }, []);

  return (
    <div className={styles.container}>
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
            Contact <b>Agro7#0007</b> on Discord so we can add your server to
            the list.
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
          data={servers.map((s) => s.country)}
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
          mt={'md'}
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
