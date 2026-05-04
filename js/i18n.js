// Lightweight i18n: swap any element with a [data-i18n="key.path"] attribute
// to the matching string from the active language dictionary. EN is the default.
// Persisted in localStorage so the choice carries across pages.
//
// Usage in HTML:
//   <span data-i18n="nav.home">Home</span>          → text content
//   <input data-i18n="search.placeholder" data-i18n-attr="placeholder">  → swap a specific attribute
//   <title data-i18n="page.title">RSU Library</title>
//
// Toggle:
//   <button data-lang="en">EN</button>
//   <button data-lang="th">TH</button>

const translations = {
  en: {
    brand: {
      name: 'RSU Library',
      tagline: 'Rangsit University',
    },
    nav: {
      home: 'Home',
      resources: 'Resources',
      services: 'Services',
      news: 'News & Events',
      askBtn: 'Ask Librarian',
    },
    home: {
      stamp: 'Filed · 04 / 05 / 26',
      heroLine1: 'Ask the',
      heroLine2: 'library',
      heroLine3: 'any',
      heroLine4: 'hour',
      heroDot: '.',
      lede: '300,000+ references in the catalog. 50+ databases. And a librarian-AI that doesn\'t go home at 8.',
      searchPlaceholder: 'Find a title, author, subject — or just ask a question…',
      search: 'Search',
      filters: {
        catalog: 'Catalog',
        databases: 'Databases',
        archives: 'Archives',
        askAi: 'Ask the AI',
      },
      deco: {
        num: '24',
        unit: 'Hrs',
        status: 'Open',
      },
      ticket: {
        title: "Tonight's Status",
        refDesk: 'Reference Desk',
        refDeskVal: 'Closed · 8AM Mon',
        aiAssistant: 'AI Assistant',
        aiAssistantVal: 'Online · EN/TH',
        building: 'Building 7',
        buildingVal: '12 / 20 Free',
        hours: 'Hours',
        hoursVal: '8 — 20:00',
        askAnything: 'Ask anything',
        openChat: 'Open chat →',
      },
      stripe: {
        catalog: 'Catalog',
        databases: 'Databases',
        services: 'Services',
        askAi: 'Ask AI',
        meta: 'Library Use Only · Bldg 7',
      },
      dbHeading1: 'Databases.',
      dbHeading2: 'By subject.',
      dbMeta1: 'Updated this term',
      dbMeta2: '8 of 50+ shown',
      db: {
        access: 'Access',
        healthCat: 'Health · McGraw-Hill',
        medicalCat: 'Medical · Open Access',
        businessCat: 'Business · Industry',
        allInOneCat: 'All-in-one Search',
        engineeringCat: 'Engineering · IEEE',
        scienceCat: 'Science · Elsevier',
        indexCat: 'Citation Index · 27k+ titles',
        plagiarismCat: 'Plagiarism Check',
      },
    },
    news: {
      headerTitle: 'News & Events',
      headerSubtitle: 'Stay updated with the latest happenings at RSU Library',
      categories: {
        all: 'All',
        news: 'News',
        events: 'Events',
        announcements: 'Announcements',
      },
      labels: {
        event: 'Event',
        news: 'News',
        announcement: 'Announcement',
      },
      readMore: 'Learn More',
      loadMore: 'Load More',
      items: {
        workshopTitle: 'Research Writing Workshop Series',
        workshopDesc: 'Join our comprehensive workshop series on academic writing and research methodology. Perfect for graduate students and researchers.',
        databasesTitle: 'New Research Databases Available',
        databasesDesc: "We're excited to announce new subscriptions to major research databases, expanding our digital resources collection.",
        finalsTitle: 'Extended Library Hours During Finals',
        finalsDesc: 'The library will remain open 24/7 during the final examination period to support your study needs.',
        donationTitle: 'Major Book Donation Received',
        donationDesc: 'The library has received a significant donation of academic books from a prominent professor emeritus.',
      },
    },
    services: {
      headerTitle: 'Library Services',
      headerSubtitle: 'Discover the range of services available to support your academic journey',
      learnMore: 'Learn More',
      borrowing: {
        title: 'Borrowing & Returns',
        i1: 'Book borrowing for students and staff (up to 10 items)',
        i2: 'Inter-library loans with partner institutions',
        i3: '24/7 self-service kiosks for returns',
        i4: 'Online renewal system (up to 3 renewals)',
        i5: 'Reserve materials for courses',
        i6: 'Document delivery service',
      },
      computer: {
        title: 'Computer & Printing',
        i1: '200+ computer workstations',
        i2: 'Wireless printing from personal devices',
        i3: 'High-speed scanning facilities',
        i4: 'Technical support (8AM-8PM)',
        i5: 'Color and B&W printing options',
        i6: 'Software support for academic tools',
      },
      study: {
        title: 'Study Spaces',
        i1: '20 Group study rooms (bookable online)',
        i2: '100+ Individual study carrels',
        i3: 'Designated quiet study areas',
        i4: '24/7 study space with security',
        i5: 'Collaborative learning zones',
        i6: 'Media viewing rooms',
      },
      research: {
        title: 'Research Support',
        i1: 'One-on-one research consultations',
        i2: 'Citation management tools (EndNote, Zotero)',
        i3: 'Systematic literature review assistance',
        i4: 'Database training sessions',
        i5: 'Research data management',
        i6: 'Publication support services',
      },
      training: {
        title: 'Training & Workshops',
        i1: 'Library orientation for new students',
        i2: 'Advanced research skills workshops',
        i3: 'Digital literacy certification',
        i4: 'Academic writing workshops',
        i5: 'Thesis formatting support',
        i6: 'Information literacy programs',
      },
      accessibility: {
        title: 'Accessibility Services',
        i1: 'Screen readers and magnification software',
        i2: 'Special needs support staff',
        i3: 'Alternative format materials',
        i4: 'Accessible study spaces',
        i5: 'Adaptive technology lab',
        i6: 'Sign language interpretation (by appointment)',
      },
      digital: {
        title: 'Digital Resources',
        i1: 'E-book and e-journal access',
        i2: 'Online database subscriptions',
        i3: 'Digital archives and repositories',
        i4: 'Mobile library apps',
        i5: 'Virtual reference service',
        i6: 'Off-campus access support',
      },
      equipment: {
        title: 'Special Equipment',
        i1: '3D printers and scanners',
        i2: 'Audio/video recording equipment',
        i3: 'Digital cameras and accessories',
        i4: 'Multimedia editing stations',
        i5: 'VR/AR equipment',
        i6: 'Presentation practice rooms',
      },
      collection: {
        title: 'Collection Services',
        i1: 'New acquisition requests',
        i2: 'Course reserve materials',
        i3: 'Special collections access',
        i4: 'Archive consultation',
        i5: 'Preservation services',
        i6: 'Collection suggestions',
      },
    },
    resources: {
      searchHeading: 'Search Library Resources',
      tabs: {
        all: 'All Resources',
        books: 'Library Catalog',
        archives: 'Archives',
        journals: 'E-Journals',
      },
      searchType: {
        keyword: 'Keyword',
        title: 'Title',
        author: 'Author',
      },
      searchPlaceholder: 'Search resources...',
      searchBtn: 'Search',
      advanced: 'Ask the AI to find it',
      databasesHeading: 'Online Databases.',
      dbMeta1: 'Subscriptions active',
      dbMeta2: '4 of 50+ shown',
      dbCat: {
        health: 'Health · McGraw-Hill',
        medical: 'Medical · Open Access',
        business: 'Business · EBSCO',
        science: 'Science · Elsevier',
      },
      accessDatabase: 'Access',
      offCampusNote: 'Contact the library for off-campus access credentials.',
      toolsHeading: 'Research Tools.',
      toolMeta1: 'Free for students',
      toolMeta2: '3 essentials',
      toolCat: {
        plagiarism: 'Plagiarism Check',
        citation: 'Citation Manager · Free',
        reference: 'Reference Manager · Elsevier',
      },
      accessTool: 'Access',
      viewManual: 'View Manual',
    },
    chatbot: {
      sidebar: {
        quickLinks: 'Quick Links',
        hours: 'Library Hours',
        borrowing: 'Borrowing Books',
        studyRooms: 'Study Rooms',
        onlineResources: 'Online Resources',
        backToLibrary: 'Back to Library',
      },
      header: {
        title: 'Library Assistant',
        connecting: 'Connecting...',
      },
      welcome: {
        title: 'Welcome to RSU Library',
        intro: 'Hi! I can help you with:',
        i1: 'Finding books and resources',
        i2: 'Booking study rooms',
        i3: 'Printing and computer services',
        i4: 'Library hours and locations',
        prompt: 'What can I help you with?',
      },
      input: {
        placeholder: 'Type your message here...',
      },
    },
    footer: {
      contactHeading: 'Contact Us',
      email: 'Email',
      phone: 'Phone',
      addressLine1: '52/347 Muang-Ake, Phaholyothin Road',
      addressLine2: 'Lak-Hok, Muang, Pathumthani 12000',
      addressLine3: 'Thailand',
      quickLinksHeading: 'Quick Links',
      hours: 'Library Hours',
      studyRoom: 'Book a Study Room',
      guides: 'Research Guides',
      vpn: 'VPN Access',
      followHeading: 'Follow Us',
      copyright: '© 2026 Rangsit University Library. All rights reserved.',
    },
  },
  th: {
    brand: {
      name: 'หอสมุด ม.รังสิต',
      tagline: 'มหาวิทยาลัยรังสิต',
    },
    nav: {
      home: 'หน้าหลัก',
      resources: 'ทรัพยากร',
      services: 'บริการ',
      news: 'ข่าวสารและกิจกรรม',
      askBtn: 'ถามบรรณารักษ์',
    },
    home: {
      stamp: 'บันทึกไว้ · 04 / 05 / 26',
      heroLine1: 'ถาม',
      heroLine2: 'หอสมุด',
      heroLine3: 'ทุก',
      heroLine4: 'ชั่วโมง',
      heroDot: '.',
      lede: 'ทรัพยากรในแคตตาล็อกกว่า 300,000 รายการ ฐานข้อมูลมากกว่า 50 ระบบ และ AI บรรณารักษ์ที่ไม่กลับบ้านตอน 2 ทุ่ม',
      searchPlaceholder: 'ค้นหาชื่อเรื่อง ผู้แต่ง หัวข้อ — หรือถามคำถาม…',
      search: 'ค้นหา',
      filters: {
        catalog: 'แคตตาล็อก',
        databases: 'ฐานข้อมูล',
        archives: 'จดหมายเหตุ',
        askAi: 'ถาม AI',
      },
      deco: {
        num: '24',
        unit: 'ชม.',
        status: 'เปิด',
      },
      ticket: {
        title: 'สถานะคืนนี้',
        refDesk: 'เคาน์เตอร์บริการ',
        refDeskVal: 'ปิด · 8 โมง จ.',
        aiAssistant: 'AI ผู้ช่วย',
        aiAssistantVal: 'ออนไลน์ · EN/TH',
        building: 'อาคาร 7',
        buildingVal: 'ห้องว่าง 12 / 20',
        hours: 'เวลาทำการ',
        hoursVal: '8 — 20:00',
        askAnything: 'ถามอะไรก็ได้',
        openChat: 'เปิดแชต →',
      },
      stripe: {
        catalog: 'แคตตาล็อก',
        databases: 'ฐานข้อมูล',
        services: 'บริการ',
        askAi: 'ถาม AI',
        meta: 'ใช้ในหอสมุดเท่านั้น · อาคาร 7',
      },
      dbHeading1: 'ฐานข้อมูล.',
      dbHeading2: 'แยกตามหัวข้อ.',
      dbMeta1: 'อัปเดตเทอมนี้',
      dbMeta2: 'แสดง 8 จาก 50+',
      db: {
        access: 'เข้าใช้',
        healthCat: 'สุขภาพ · McGraw-Hill',
        medicalCat: 'การแพทย์ · เปิดเข้าถึง',
        businessCat: 'ธุรกิจ · อุตสาหกรรม',
        allInOneCat: 'ค้นหาทุกอย่างในที่เดียว',
        engineeringCat: 'วิศวกรรม · IEEE',
        scienceCat: 'วิทยาศาสตร์ · Elsevier',
        indexCat: 'ดัชนีการอ้างอิง · 27,000+ ชื่อเรื่อง',
        plagiarismCat: 'ตรวจการคัดลอก',
      },
    },
    news: {
      headerTitle: 'ข่าวสารและกิจกรรม',
      headerSubtitle: 'ติดตามความเคลื่อนไหวล่าสุดของหอสมุด ม.รังสิต',
      categories: {
        all: 'ทั้งหมด',
        news: 'ข่าวสาร',
        events: 'กิจกรรม',
        announcements: 'ประกาศ',
      },
      labels: {
        event: 'กิจกรรม',
        news: 'ข่าวสาร',
        announcement: 'ประกาศ',
      },
      readMore: 'อ่านเพิ่มเติม',
      loadMore: 'โหลดเพิ่มเติม',
      items: {
        workshopTitle: 'ชุดอบรมการเขียนงานวิจัย',
        workshopDesc: 'เข้าร่วมชุดอบรมเชิงปฏิบัติการด้านการเขียนเชิงวิชาการและระเบียบวิธีวิจัย เหมาะสำหรับนักศึกษาบัณฑิตศึกษาและนักวิจัย',
        databasesTitle: 'เปิดให้บริการฐานข้อมูลวิจัยใหม่',
        databasesDesc: 'หอสมุดเปิดให้บริการฐานข้อมูลวิจัยรายการใหม่ ขยายคลังทรัพยากรดิจิทัลให้ครอบคลุมยิ่งขึ้น',
        finalsTitle: 'ขยายเวลาเปิดบริการช่วงสอบปลายภาค',
        finalsDesc: 'หอสมุดเปิดบริการตลอด 24 ชั่วโมงในช่วงสอบปลายภาค เพื่อสนับสนุนการอ่านหนังสือของนักศึกษา',
        donationTitle: 'ได้รับมอบหนังสือล็อตใหญ่',
        donationDesc: 'หอสมุดได้รับมอบหนังสือวิชาการจำนวนมากจากศาสตราจารย์เกียรติคุณท่านหนึ่ง',
      },
    },
    services: {
      headerTitle: 'บริการของหอสมุด',
      headerSubtitle: 'ค้นพบบริการต่าง ๆ ที่สนับสนุนการเรียนรู้และการวิจัยของคุณ',
      learnMore: 'อ่านเพิ่มเติม',
      borrowing: {
        title: 'ยืม-คืนหนังสือ',
        i1: 'บริการยืมหนังสือสำหรับนักศึกษาและบุคลากร (สูงสุด 10 รายการ)',
        i2: 'บริการยืมระหว่างห้องสมุดกับสถาบันเครือข่าย',
        i3: 'ตู้คืนหนังสืออัตโนมัติ เปิดบริการตลอด 24 ชั่วโมง',
        i4: 'ระบบต่ออายุการยืมออนไลน์ (สูงสุด 3 ครั้ง)',
        i5: 'สำรองหนังสือประกอบรายวิชา',
        i6: 'บริการจัดส่งเอกสาร',
      },
      computer: {
        title: 'คอมพิวเตอร์และการพิมพ์',
        i1: 'เครื่องคอมพิวเตอร์สำหรับใช้งานกว่า 200 เครื่อง',
        i2: 'พิมพ์ไร้สายจากอุปกรณ์ส่วนตัว',
        i3: 'เครื่องสแกนเอกสารความเร็วสูง',
        i4: 'ทีมสนับสนุนทางเทคนิค (08:00-20:00 น.)',
        i5: 'พิมพ์ทั้งสีและขาวดำ',
        i6: 'สนับสนุนซอฟต์แวร์เพื่อการศึกษา',
      },
      study: {
        title: 'พื้นที่อ่านหนังสือ',
        i1: 'ห้องอ่านกลุ่ม 20 ห้อง (จองออนไลน์ได้)',
        i2: 'โต๊ะอ่านเดี่ยวกว่า 100 ที่นั่ง',
        i3: 'โซนอ่านหนังสือเงียบสงบ',
        i4: 'พื้นที่อ่านหนังสือ 24 ชั่วโมง พร้อมระบบรักษาความปลอดภัย',
        i5: 'พื้นที่เรียนรู้แบบกลุ่ม',
        i6: 'ห้องสำหรับชมสื่อมัลติมีเดีย',
      },
      research: {
        title: 'สนับสนุนการวิจัย',
        i1: 'บริการให้คำปรึกษาด้านการวิจัยตัวต่อตัว',
        i2: 'เครื่องมือจัดการบรรณานุกรม (EndNote, Zotero)',
        i3: 'ช่วยเหลือการทบทวนวรรณกรรมอย่างเป็นระบบ',
        i4: 'อบรมการใช้ฐานข้อมูล',
        i5: 'การจัดการข้อมูลวิจัย',
        i6: 'บริการสนับสนุนการตีพิมพ์ผลงาน',
      },
      training: {
        title: 'อบรมและเวิร์กช็อป',
        i1: 'ปฐมนิเทศการใช้หอสมุดสำหรับนักศึกษาใหม่',
        i2: 'เวิร์กช็อปทักษะการวิจัยขั้นสูง',
        i3: 'การรับรองทักษะดิจิทัล',
        i4: 'อบรมการเขียนเชิงวิชาการ',
        i5: 'ช่วยจัดรูปแบบวิทยานิพนธ์',
        i6: 'หลักสูตรการรู้สารสนเทศ',
      },
      accessibility: {
        title: 'บริการสำหรับผู้พิการ',
        i1: 'โปรแกรมอ่านหน้าจอและซอฟต์แวร์ขยายภาพ',
        i2: 'เจ้าหน้าที่ช่วยเหลือผู้มีความต้องการพิเศษ',
        i3: 'สื่อในรูปแบบทางเลือก',
        i4: 'พื้นที่อ่านหนังสือที่เข้าถึงได้',
        i5: 'ห้องเทคโนโลยีสิ่งอำนวยความสะดวก',
        i6: 'บริการล่ามภาษามือ (นัดล่วงหน้า)',
      },
      digital: {
        title: 'ทรัพยากรดิจิทัล',
        i1: 'การเข้าถึงหนังสือและวารสารอิเล็กทรอนิกส์',
        i2: 'ฐานข้อมูลออนไลน์',
        i3: 'คลังข้อมูลและจดหมายเหตุดิจิทัล',
        i4: 'แอปพลิเคชันหอสมุดบนมือถือ',
        i5: 'บริการตอบคำถามออนไลน์',
        i6: 'สนับสนุนการเข้าใช้งานนอกมหาวิทยาลัย',
      },
      equipment: {
        title: 'อุปกรณ์พิเศษ',
        i1: 'เครื่องพิมพ์และสแกน 3 มิติ',
        i2: 'อุปกรณ์บันทึกเสียงและวิดีโอ',
        i3: 'กล้องดิจิทัลและอุปกรณ์เสริม',
        i4: 'สถานีตัดต่อสื่อมัลติมีเดีย',
        i5: 'อุปกรณ์ VR/AR',
        i6: 'ห้องซ้อมการนำเสนอ',
      },
      collection: {
        title: 'บริการพัฒนาทรัพยากร',
        i1: 'เสนอจัดซื้อทรัพยากรใหม่',
        i2: 'ทรัพยากรสำรองประกอบรายวิชา',
        i3: 'การเข้าใช้คอลเลกชันพิเศษ',
        i4: 'บริการให้คำปรึกษาด้านจดหมายเหตุ',
        i5: 'บริการอนุรักษ์ทรัพยากร',
        i6: 'รับข้อเสนอแนะการจัดหาทรัพยากร',
      },
    },
    resources: {
      searchHeading: 'ค้นหาทรัพยากรของหอสมุด',
      tabs: {
        all: 'ทรัพยากรทั้งหมด',
        books: 'แคตตาล็อกหนังสือ',
        archives: 'จดหมายเหตุ',
        journals: 'วารสารอิเล็กทรอนิกส์',
      },
      searchType: {
        keyword: 'คำสำคัญ',
        title: 'ชื่อเรื่อง',
        author: 'ผู้แต่ง',
      },
      searchPlaceholder: 'ค้นหาทรัพยากร...',
      searchBtn: 'ค้นหา',
      advanced: 'ให้ AI ช่วยค้นหา',
      databasesHeading: 'ฐานข้อมูลออนไลน์.',
      dbMeta1: 'สมัครใช้งานแล้ว',
      dbMeta2: 'แสดง 4 จาก 50+',
      dbCat: {
        health: 'สุขภาพ · McGraw-Hill',
        medical: 'การแพทย์ · เปิดเข้าถึง',
        business: 'ธุรกิจ · EBSCO',
        science: 'วิทยาศาสตร์ · Elsevier',
      },
      accessDatabase: 'เข้าใช้',
      offCampusNote: 'ติดต่อหอสมุดเพื่อขอข้อมูลการเข้าใช้งานจากภายนอกมหาวิทยาลัย',
      toolsHeading: 'เครื่องมือเพื่อการวิจัย.',
      toolMeta1: 'ฟรีสำหรับนักศึกษา',
      toolMeta2: 'เครื่องมือหลัก 3 ตัว',
      toolCat: {
        plagiarism: 'ตรวจการคัดลอก',
        citation: 'จัดการการอ้างอิง · ฟรี',
        reference: 'จัดการรายการอ้างอิง · Elsevier',
      },
      accessTool: 'เข้าใช้',
      viewManual: 'ดูคู่มือการใช้งาน',
    },
    chatbot: {
      sidebar: {
        quickLinks: 'ลิงก์ด่วน',
        hours: 'เวลาทำการ',
        borrowing: 'การยืมหนังสือ',
        studyRooms: 'ห้องอ่านหนังสือ',
        onlineResources: 'ทรัพยากรออนไลน์',
        backToLibrary: 'กลับสู่หน้าหอสมุด',
      },
      header: {
        title: 'ผู้ช่วยหอสมุด',
        connecting: 'กำลังเชื่อมต่อ...',
      },
      welcome: {
        title: 'ยินดีต้อนรับสู่หอสมุด ม.รังสิต',
        intro: 'สวัสดี! ฉันสามารถช่วยคุณเรื่อง:',
        i1: 'ค้นหาหนังสือและทรัพยากร',
        i2: 'จองห้องอ่านหนังสือ',
        i3: 'บริการพิมพ์เอกสารและคอมพิวเตอร์',
        i4: 'เวลาทำการและที่ตั้งของหอสมุด',
        prompt: 'มีอะไรให้ช่วยไหมคะ/ครับ?',
      },
      input: {
        placeholder: 'พิมพ์ข้อความของคุณที่นี่...',
      },
    },
    footer: {
      contactHeading: 'ติดต่อเรา',
      email: 'อีเมล',
      phone: 'โทรศัพท์',
      addressLine1: '52/347 เมืองเอก ถนนพหลโยธิน',
      addressLine2: 'หลักหก เมือง ปทุมธานี 12000',
      addressLine3: 'ประเทศไทย',
      quickLinksHeading: 'ลิงก์ด่วน',
      hours: 'เวลาทำการ',
      studyRoom: 'จองห้องอ่านหนังสือ',
      guides: 'คู่มือการวิจัย',
      vpn: 'การเข้าใช้งานผ่าน VPN',
      followHeading: 'ติดตามเรา',
      copyright: '© 2026 หอสมุดมหาวิทยาลัยรังสิต สงวนลิขสิทธิ์',
    },
  },
}

const STORAGE_KEY = 'lang'
const DEFAULT_LANG = 'en'

function getLang() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG
}

function setLang(lang) {
  if (!translations[lang]) return
  const prev = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG
  localStorage.setItem(STORAGE_KEY, lang)
  document.documentElement.setAttribute('lang', lang)
  applyTranslations(lang)
  updateToggleState(lang)
  // Notify other modules (e.g. chatbot) so they can react — chat history
  // gets cleared so the bot doesn't reference EN context in a TH reply.
  if (prev !== lang) {
    document.dispatchEvent(new CustomEvent('rsu:lang-changed', { detail: { lang, prev } }))
  }
}

// Resolve a "a.b.c" path against a nested object
function resolve(dict, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), dict)
}

function applyTranslations(lang) {
  const dict = translations[lang]
  if (!dict) return

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n')
    const value = resolve(dict, key)
    if (value === undefined) return

    const targetAttr = el.getAttribute('data-i18n-attr')
    if (targetAttr) {
      el.setAttribute(targetAttr, value)
    } else {
      el.textContent = value
    }
  })
}

function updateToggleState(lang) {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang)
  })
}

function wireToggle() {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const lang = btn.getAttribute('data-lang')
      setLang(lang)
    })
  })
}

function init() {
  const lang = getLang()
  document.documentElement.setAttribute('lang', lang)
  applyTranslations(lang)
  updateToggleState(lang)
  wireToggle()
}

// type="module" scripts run after DOMContentLoaded has fired, so check readyState
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

// Expose for other scripts that load content dynamically
window.i18n = {
  getLang,
  setLang,
  applyTranslations: () => applyTranslations(getLang()),
  t: (key) => resolve(translations[getLang()] || translations.en, key),
}
