/**
 * Web3Forms 設定
 *
 * 注意: access_key は Vite の環境変数でクライアントに渡るため、
 * 完全な秘匿にはなりません。Domain restriction / CAPTCHA 等の併用を推奨してください。
 */

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
export const WEB3FORMS_FROM_NAME = 'PlayLinks B2Bサイト'
export const WEB3FORMS_SUBJECT = '【PlayLinks】お問い合わせ（案件のご相談）'

/** .env.local の VITE_WEB3FORMS_ACCESS_KEY（未設定時は空文字の可能性あり） */
export const WEB3FORMS_ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string) ?? ''
