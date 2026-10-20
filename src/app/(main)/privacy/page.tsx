import { type Metadata } from 'next'

import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'What data d0dge: glyph survival processes, by whom, why, for how long, and what you can do about it.',
}

// Update this whenever the policy changes (section 14 points to it).
const lastUpdated = '19 October 2026'

const email = 'apps@webvorming.nl'

function Email() {
  return <a href={`mailto:${email}`}>{email}</a>
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-14">
      <h2 className="font-dot text-2xl tracking-wider text-phosphor">
        {title}
      </h2>
      {children}
    </section>
  )
}

const retention = [
  {
    data: 'Save file (scores, settings, glyphies, items)',
    who: 'Nobody: stays on your device',
    why: 'Running the game',
    howLong: 'Until you uninstall the game',
  },
  {
    data: 'Consent status, IP address, device and ad data',
    who: 'Google (AdMob)',
    why: 'Consent, showing and measuring ads, fraud prevention, personalisation only with consent',
    howLong:
      'Per Google’s retention policies; your consent choice is stored on your device until you change it or uninstall',
  },
  {
    data: 'Anonymous app user ID, purchase and transaction details, technical data',
    who: 'RevenueCat (our processor); we can view them',
    why: 'Checking, granting and restoring purchases; fraud prevention',
    howLong:
      'As long as needed to restore your purchases and handle refunds, and up to 7 years where Dutch tax law requires it',
  },
  {
    data: 'Payment details',
    who: 'Apple or Google only',
    why: 'Payment',
    howLong: 'Per Apple’s or Google’s policies',
  },
  {
    data: 'Aggregated statistics and crash reports',
    who: 'Apple or Google, shared with us',
    why: 'Fixing problems',
    howLong: 'Per Apple’s or Google’s policies',
  },
  {
    data: 'Your emails to us',
    who: 'Webvorming',
    why: 'Answering you',
    howLong: 'Up to 2 years after the matter is closed',
  },
]

export default function Privacy() {
  return (
    <Container className="py-16 sm:py-24">
      <article className="mx-auto max-w-3xl text-signal [&_a]:text-phosphor [&_a]:underline [&_a]:decoration-grid [&_a]:underline-offset-4 hover:[&_a]:decoration-phosphor [&_h3]:mt-8 [&_h3]:font-semibold [&_h3]:text-phosphor [&_li]:pl-1 [&_p]:mt-4 [&_strong]:text-phosphor [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-grid">
        <p className="!mt-0 text-sm tracking-widest uppercase">
          Last updated {lastUpdated}
        </p>
        <h1 className="mt-4 font-dot text-4xl text-phosphor sm:text-5xl">
          Privacy policy
        </h1>

        <p className="text-lg">
          d0dge: glyph survival (“d0dge”, “the game”) is published by
          Webvorming, the Netherlands (“we”, “us”). We are the controller for
          the personal data described in this policy, under the EU General Data
          Protection Regulation (GDPR) and Dutch law. Our contact details are at
          the end of this policy.
        </p>
        <p>
          This policy applies to the game on iOS and Android and to this page.
          It explains what data is processed, by whom, why, for how long, and
          what you can do about it.
        </p>

        <Section title="In short">
          <ul>
            <li>
              You don’t need an account, and the game never asks for your name,
              email address, contacts, photos or precise location.
            </li>
            <li>
              Your scores, settings, glyphies and unlocked items are stored only
              on your device. We never receive them.
            </li>
            <li>
              We use no analytics and no tracking of our own, and the game never
              asks for permission to track you on iPhone.
            </li>
            <li>
              Ads are optional: you only see one when you tap WATCH AD. They
              come from Google AdMob, which receives device and usage data to
              show the ad. In the EEA, the UK and Switzerland, Google asks for
              your consent first, and you can change your choice at any time.
            </li>
            <li>
              Purchases are paid through the App Store or Google Play. We never
              see your payment details. RevenueCat processes purchase records
              for us so purchases can be checked and restored.
            </li>
            <li>
              You can ask us at any time what we hold about you, or have it
              deleted: <Email />.
            </li>
          </ul>
        </Section>

        <Section title="2. Data stored on your device">
          <p>
            The game keeps a save file in its private storage on your device. It
            contains:
          </p>
          <ul>
            <li>your best scores and your progress in the daily challenge;</li>
            <li>
              your settings (such as sound, music, haptics and reduced motion);
            </li>
            <li>
              your glyphy balance, the glyphs and palettes you own and use, and
              the last day you claimed the ad bonus;
            </li>
            <li>
              the store transaction IDs of purchases the game has already
              granted, so a purchase is never paid out twice.
            </li>
          </ul>
          <p>
            The save is never sent to us or to anyone else, and the game works
            fully offline. If your device backs up app data (for example to
            iCloud or Google), the save may be part of that backup under Apple’s
            or Google’s terms. Uninstalling the game deletes the save from your
            device.
          </p>
        </Section>

        <Section title="3. Advertising (Google AdMob)">
          <p>
            The game only has rewarded ads that you choose to watch: to continue
            a run, or for the daily glyphy bonus in the shop. There are no
            banners or forced ads, and no ads in daily-challenge runs. You never
            have to watch an ad to play.
          </p>
          <p>
            Ads are provided by Google AdMob (Google Ireland Limited for users
            in the EEA, the UK and Switzerland; Google LLC elsewhere). Google
            acts as an independent controller for the data its ad services
            collect.
          </p>

          <h3>When the game talks to Google</h3>
          <ul>
            <li>
              <strong>Consent check.</strong> When the game starts, it asks
              Google’s User Messaging Platform whether a consent message applies
              where you are, and reads the choice you made before. This sends
              technical data such as your IP address and device information.
            </li>
            <li>
              <strong>Consent form.</strong> In the EEA, the UK and Switzerland,
              Google’s consent form appears the first time you tap WATCH AD.
              Apart from the consent check, nothing ad-related happens until you
              have made a choice.
            </li>
            <li>
              <strong>Loading and showing ads.</strong> After your first tap on
              WATCH AD, the game starts Google’s ad software. On later launches
              it loads ads ahead of time, so an ad is ready when you ask for
              one.
            </li>
          </ul>

          <h3>What Google may collect</h3>
          <ul>
            <li>
              your IP address, from which an approximate location (such as
              country or city) can be derived;
            </li>
            <li>
              device and app information: device model, operating system and
              version, language, app version, and the ad unit requested;
            </li>
            <li>
              on Android, the advertising ID (which you can reset or delete in
              your device settings);
            </li>
            <li>
              on iPhone, Google cannot read the advertising identifier (IDFA),
              because the game never asks for permission to track you;
            </li>
            <li>
              interactions with ads (whether an ad was shown, watched to the
              end, or tapped) and diagnostic data such as load times and errors.
            </li>
          </ul>
          <p>
            Google uses this data to show and measure ads, to limit how often
            you see the same ad, and to prevent fraud and abuse. It personalises
            ads only where you allow it. We only ask for ads rated for teens and
            older, and the game is not marked as directed at children.
          </p>

          <h3>Personalised ads and your choices</h3>
          <ul>
            <li>
              <strong>EEA, UK and Switzerland:</strong> personalised ads only
              happen with your consent through Google’s form. The same goes for
              storing or reading information on your device for ads. If you
              decline, Google may still show non-personalised or limited ads.
              These use contextual information and only the data needed to serve
              and measure the ad and to prevent fraud.
            </li>
            <li>
              <strong>Changing your choice:</strong> open Settings › PRIVACY
              OPTIONS in the game to see or change your choice at any time. The
              option appears wherever a consent choice applies. Withdrawing
              consent doesn’t affect processing that already happened.
            </li>
            <li>
              On iPhone, ads are not based on tracking you across other
              companies’ apps and websites.
            </li>
            <li>
              On Android, you can turn off ads personalisation or delete your
              advertising ID in your device’s Google settings.
            </li>
          </ul>

          <h3>Legal basis</h3>
          <ul>
            <li>
              Your consent (GDPR Art. 6(1)(a)) for personalised ads, and for
              storing or reading information on your device where consent is
              required.
            </li>
            <li>
              Our legitimate interest (Art. 6(1)(f)) in checking whether consent
              is needed, in offering free optional rewards funded by ads, and in
              preventing ad fraud.
            </li>
          </ul>
          <p>
            More about Google’s practices:{' '}
            <a href="https://policies.google.com/privacy">
              Google Privacy Policy
            </a>{' '}
            and{' '}
            <a href="https://policies.google.com/technologies/partner-sites">
              How Google uses information from sites or apps that use its
              services
            </a>
            .
          </p>
        </Section>

        <Section title="4. Purchases (App Store, Google Play and RevenueCat)">
          <p>
            You can buy glyphy bundles and a supporter pack. Payments are
            handled entirely by Apple (App Store) or Google (Google Play) under
            their own terms and privacy policies. We never receive your name,
            email address or payment details.
          </p>
          <p>
            We use RevenueCat, Inc. (United States) as our processor, under a
            data processing agreement. RevenueCat checks that a purchase is
            genuine, lets us grant it, and lets you restore the supporter pack
            on a new device. When you buy or restore, RevenueCat receives:
          </p>
          <ul>
            <li>
              a random, anonymous app user ID created by the game (not linked to
              your name or store account);
            </li>
            <li>
              the purchase receipt and transaction details: product, price,
              currency, store, country or storefront, date and transaction ID;
            </li>
            <li>
              technical data: IP address, device model, operating system and app
              version.
            </li>
          </ul>

          <h3>Legal basis</h3>
          <ul>
            <li>
              Performing our contract with you (GDPR Art. 6(1)(b)): delivering
              and restoring what you bought.
            </li>
            <li>
              Our legitimate interest (Art. 6(1)(f)) in preventing purchase
              fraud.
            </li>
            <li>
              Legal obligations (Art. 6(1)(c)) for records we must keep for tax
              purposes.
            </li>
          </ul>
          <p>
            More:{' '}
            <a href="https://www.revenuecat.com/privacy">
              RevenueCat Privacy Policy
            </a>
            ,{' '}
            <a href="https://www.apple.com/legal/privacy/">
              Apple Privacy Policy
            </a>
            .
          </p>
        </Section>

        <Section title="5. App stores">
          <p>
            You download d0dge from the App Store or Google Play, which process
            data about you under their own privacy policies. You may have agreed
            in your device settings to share analytics with app developers. If
            so, Apple or Google may give us aggregated statistics and crash
            reports about the game (such as installs, device types and crashes).
            These don’t identify you, and we use them only to fix problems and
            improve the game.
          </p>
        </Section>

        <Section title="6. When you contact us">
          <p>
            If you email us, we use your email address and the contents of your
            message to answer you and to handle your request. The legal basis is
            our legitimate interest in answering you, or a legal obligation when
            you exercise your rights. We delete the correspondence when it’s no
            longer needed, at the latest two years after the matter is closed.
          </p>
        </Section>

        <Section title="7. What we don’t do">
          <ul>
            <li>
              No account or sign-in. The game doesn’t collect your name, email
              address, phone number, contacts, photos or precise location.
            </li>
            <li>
              No analytics, crash-reporting or tracking software of our own in
              the game.
            </li>
            <li>
              No request on iPhone for permission to track you across apps and
              websites.
            </li>
            <li>No online leaderboards or social features.</li>
            <li>
              No selling of your data, and no sharing beyond the parties named
              in this policy.
            </li>
            <li>
              No automated decision-making that has legal or similarly
              significant effects on you.
            </li>
          </ul>
        </Section>

        <Section title="8. Overview and retention">
          <div className="mt-6 overflow-x-auto border border-grid">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="border-b border-grid text-xs tracking-widest text-phosphor uppercase">
                <tr>
                  <th scope="col" className="p-3 font-normal">
                    Data
                  </th>
                  <th scope="col" className="p-3 font-normal">
                    Who receives it
                  </th>
                  <th scope="col" className="p-3 font-normal">
                    Why
                  </th>
                  <th scope="col" className="p-3 font-normal">
                    How long
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-grid align-top">
                {retention.map((row) => (
                  <tr key={row.data}>
                    <th scope="row" className="p-3 font-normal text-phosphor">
                      {row.data}
                    </th>
                    <td className="p-3">{row.who}</td>
                    <td className="p-3">{row.why}</td>
                    <td className="p-3">{row.howLong}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="9. Transfers outside the EEA">
          <p>
            Google and RevenueCat may process data in the United States and
            other countries outside the European Economic Area. Such transfers
            are protected in one of two ways: by the EU–US Data Privacy
            Framework for certified companies, or by the European Commission’s
            Standard Contractual Clauses with extra safeguards where needed. You
            can ask us for more information about these safeguards.
          </p>
        </Section>

        <Section title="10. Security">
          <ul>
            <li>
              The save file stays in the game’s private storage, protected by
              your device’s operating system.
            </li>
            <li>
              Data sent to Google and RevenueCat travels over encrypted
              connections (HTTPS).
            </li>
            <li>
              Only we can access the RevenueCat dashboard, and it is protected
              by strong authentication.
            </li>
            <li>
              The game doesn’t collect your name or contact details, so the data
              we can access can’t easily be linked to you.
            </li>
          </ul>
        </Section>

        <Section title="11. Children">
          <p>
            d0dge is meant for players aged 13 and older and is not directed at
            children under 13. We don’t knowingly collect personal data from
            children under 13.
          </p>
          <p>
            In the EEA, you may need to be older to agree to personalised ads
            yourself (16 in the Netherlands). If you are younger than that, ask
            a parent or guardian before agreeing to personalised ads, or simply
            decline them. The game and its optional ads work either way.
          </p>
          <p>
            If you believe a child has provided data through the game, contact
            us and we will help remove it.
          </p>
        </Section>

        <Section title="12. Your rights">
          <p>Under the GDPR you have the right to:</p>
          <ul>
            <li>access the personal data we hold about you and get a copy;</li>
            <li>rectify data that is wrong;</li>
            <li>erase your data (“right to be forgotten”);</li>
            <li>
              restrict processing, and object to processing based on our
              legitimate interest;
            </li>
            <li>
              data portability: receive data you gave us in a machine-readable
              format;
            </li>
            <li>
              withdraw consent at any time, in the game under Settings › PRIVACY
              OPTIONS, without affecting earlier processing;
            </li>
            <li>
              lodge a complaint with a supervisory authority: in the Netherlands
              the{' '}
              <a href="https://www.autoriteitpersoonsgegevens.nl/">
                Autoriteit Persoonsgegevens
              </a>
              , or the authority where you live or work.
            </li>
          </ul>
          <p>
            To use these rights, email <Email />.
          </p>
          <ul>
            <li>
              We answer within one month. For complex requests this can be
              extended by two months, and we’ll tell you if so.
            </li>
            <li>
              The game doesn’t tell us who you are, so we may ask for details
              that let us find your data, such as the date, store and product of
              a purchase.
            </li>
            <li>
              Requests are free, and these rights apply to all players, wherever
              you live.
            </li>
          </ul>
          <p>
            For data that Google holds as its own controller, you can also go to
            Google directly through your{' '}
            <a href="https://myaccount.google.com/">Google Account</a> or
            Google’s privacy policy.
          </p>
        </Section>

        <Section title="13. Deleting your data">
          <ul>
            <li>
              <strong>Game data:</strong> uninstall the game. This deletes the
              save and your ad consent choice from your device. If you want
              those gone completely, also remove any device backups of the game.
            </li>
            <li>
              <strong>Purchase records:</strong> email us and we will delete
              your records at RevenueCat, except what we must keep by law. If
              you restore purchases afterwards, a new anonymous record is
              created.
            </li>
            <li>
              <strong>Advertising data:</strong> withdraw consent in Settings ›
              PRIVACY OPTIONS. On Android, reset or delete your advertising ID.
              For data Google holds, use Google’s own controls.
            </li>
          </ul>
          <p>
            There is no account to delete, because the game doesn’t use
            accounts.
          </p>
        </Section>

        <Section title="14. Changes to this policy">
          <p>
            We update this policy when the game or the law changes; the date at
            the top shows the latest version. If a change significantly affects
            how your data is used, we will announce it before it takes effect,
            in the game or in the app’s release notes. Where needed, we will ask
            for your consent again.
          </p>
        </Section>

        <Section title="15. Contact">
          <address className="mt-4 not-italic">
            Webvorming
            <br />
            Ridderhof 30
            <br />
            3931XZ, the Netherlands
            <br />
            KvK (Chamber of Commerce): 70314322
            <br />
            Email: <Email />
          </address>
          <p>
            We have not appointed a data protection officer, as the law doesn’t
            require one for our activities. Send privacy questions to the
            address above.
          </p>
        </Section>
      </article>
    </Container>
  )
}
