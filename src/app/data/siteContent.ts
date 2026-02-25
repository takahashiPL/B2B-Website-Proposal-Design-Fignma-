export const siteContent = {
  nav: {
    logo: "PlayLinks",
    items: [
      { id: 'top', label: 'TOP' },
      { id: 'points', label: '特徴' },
      { id: 'business', label: '事業内容' },
      { id: 'process', label: '進め方' },
      { id: 'achievements', label: '実績' },
      { id: 'company', label: '会社概要' },
      { id: 'contact', label: 'お問い合わせ' },
    ],
    contactButton: "ご相談はこちら"
  },
  hero: {
    tagline: "受託開発・共同開発に対応",
    /** 改行ルール: 語中改行禁止。・の後 or 塊の境界でのみ改行可 */
    titleChunks: [
      { text: "ゲーム・", nowrap: true },
      { text: "アプリ・", nowrap: true },
      { text: "遊技機向け", nowrap: true },
      { text: " " },
      { text: "開発を", nowrap: true },
      { text: "企画から", nowrap: true },
      { text: "実装まで", nowrap: true },
      { text: "一貫対応", nowrap: true },
    ],
    description: "クライアントのビジョンを技術で形にする、信頼のパートナーシップ。\nPlayLinksは、あなたのプロジェクトを成功へ導きます。",
    primaryButton: "お問い合わせ（案件のご相談）",
    secondaryButton: "実績を見る（準備中）",
    scrollDown: "Scroll Down"
  },
  points: [
    {
      id: "01",
      title: "対応領域",
      description: "ゲーム・アプリ・遊技機など、エンタテインメント領域全般の開発に対応可能です。",
      details: [
        "コンシューマーゲーム開発（Unity / UE5）",
        "スマートフォンアプリ（iOS / Android）",
        "遊技機液晶演出・制御開発",
        "Webアプリケーション開発"
      ]
    },
    {
      id: "02",
      title: "進め方",
      description: "企画段階からの参画、実装のみの受託など、貴社の状況に合わせて柔軟に伴走します。",
      details: [
        "企画・要件定義からの参加が可能",
        "ラボ型開発 / 受託開発の選択可能",
        "週1回の定例MTGによる進捗共有",
        "Slack / Teams 等での即時連絡体制"
      ]
    }
  ],
  business: {
    title: "事業内容",
    subtitle: "エンタメ開発のスペシャリストとして",
    items: [
      { 
        title: "ゲームソフト開発", 
        icon: "🎮", 
        desc: "コンシューマーからPCまで、プラットフォームを問わず高品質なゲーム開発を実現します。",
        bg: "from-blue-900/40 to-blue-800/10"
      },
      { 
        title: "スマホアプリ開発", 
        icon: "📱", 
        desc: "iOS/AndroidネイティブアプリからUnity/Unreal Engineを用いたリッチな表現まで対応。",
        bg: "from-indigo-900/40 to-indigo-800/10"
      },
      { 
        title: "遊技機向け開発", 
        icon: "🎰", 
        desc: "液晶演出の企画・制作・実装まで、遊技機特有のノウハウを活かした開発を提供。",
        bg: "from-purple-900/40 to-purple-800/10"
      }
    ]
  },
  process: {
    title: "開発プロセス",
    subtitle: "柔軟な連携体制でプロジェクトを成功へ",
    steps: [
      { 
        step: "01", 
        title: "課題整理", 
        sub: "役割分担を擦り合わせ", 
        desc: "ヒアリングを行い、最適なチーム編成とスケジュールをご提案します。" 
      },
      { 
        step: "02", 
        title: "設計・実装", 
        sub: "共同で推進", 
        desc: "貴社メンバーと連携し、透明性の高い開発プロセスで実装を進めます。" 
      },
      { 
        step: "03", 
        title: "運用・改善", 
        sub: "状況に応じて伴走", 
        desc: "リリース後の保守・運用や、ユーザーの反応を見た機能改善も対応。" 
      }
    ],
    notePart1: "※ プロジェクトの規模や体制に合わせて、",
    noteHighlight: "役割は柔軟に調整",
    notePart2: "いたします。"
  },
  achievements: {
    title: "実績",
    subtitle: "B2Bのため公開できる実績は限られますが、一部をご紹介します",
    moreButton: "もっと見る"
  },
  company: {
    title: "会社概要",
    basicInfo: {
      title: "基本情報",
      items: [
        { label: "会社名", value: "株式会社プレイリンクス (PLAYLINKS Co., Ltd.)" },
        { label: "設立", value: "2010年5月6日" },
        { label: "資本金", value: "700万円" },
        { label: "代表者", value: "菊地 勇" },
        { label: "所在地", value: "〒160-0022 東京都新宿区新宿3-5-6 キュープラザ新宿三丁目6Ｆ" },
        { label: "事業内容", value: "ゲームソフト・スマホアプリ開発・遊戯機向け開発" },
      ]
    },
    attitude: {
      title: "私たちの姿勢",
      items: [
        "顔が見える開発体制（エンジニアと直接対話）",
        "要件定義からの伴走（「何を作るか」から提案）",
        "誠実なコスト提示（不明瞭な見積もり排除）"
      ]
    }
  },
  contact: {
    title: "お問い合わせ",
    description: "開発のご相談、お見積もりのご依頼など、お気軽にご連絡ください。\n担当者より2営業日以内にご返信いたします。",
    formCard: {
      title: "お問い合わせフォーム",
      description: "Webフォームから24時間受付",
      button: "フォームへ移動"
    },
    infoCard: {
      phone: {
        label: "電話番号",
        value: "03-3391-6641"
      },
      address: {
        label: "所在地",
        value: "〒160-0022\n東京都新宿区新宿3-5-6\nキュープラザ新宿三丁目6Ｆ",
        googleMapUrl: "https://www.google.com/maps/search/?api=1&query=株式会社プレイリンクス+東京都新宿区新宿3-5-6+キュープラザ新宿三丁目6Ｆ",
        googleMapEmbedUrl: "https://maps.google.com/maps?q=%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%83%97%E3%83%AC%E3%82%A4%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%B9%20%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%96%B0%E5%AE%BF3-5-6%20%E3%82%AD%E3%83%A5%E3%83%BC%E3%83%97%E3%83%A9%E3%82%B6%E6%96%B0%E5%AE%BF%E4%B8%89%E4%B8%81%E7%9B%AE&t=&z=15&ie=UTF8&iwloc=&output=embed"
      }
    }
  },
  footer: {
    copyright: "© 2026 PlayLinks Inc. All rights reserved."
  }
};
