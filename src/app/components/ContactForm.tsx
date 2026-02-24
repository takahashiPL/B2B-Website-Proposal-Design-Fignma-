import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { clsx } from 'clsx';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_FROM_NAME,
  WEB3FORMS_SUBJECT,
} from '@/config/web3forms';

type FormData = {
  company: string;
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  consent: boolean;
  website?: string; // Honeypot
};

interface ContactFormProps {
  onClose: () => void;
}

export function ContactForm({ onClose }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    defaultValues: {
      consent: false,
    }
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    // Access Key 未設定時は送信しない
    const accessKey = (WEB3FORMS_ACCESS_KEY ?? '').trim()
    if (!accessKey) {
      setSubmitError('設定エラー：Web3FormsのAccess Keyが未設定です')
      return
    }

    // Honeypot: ボットと判断した場合は送信せず成功扱いで終了
    try {
      if (typeof data.website === 'string' && data.website.trim().length > 0) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 3000);
        return;
      }

      const formData = new globalThis.FormData();

      formData.append('access_key', accessKey);
      formData.append('from_name', WEB3FORMS_FROM_NAME);
      formData.append('subject', WEB3FORMS_SUBJECT);
      // domain_name: playlinks.net は Web3Forms ダッシュボード側で設定する前提

      formData.append('company', data.company);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('replyto', data.email);
      formData.append('phone', typeof data.phone === 'string' ? data.phone : '');
      formData.append('inquiryType', typeof data.inquiryType === 'string' ? data.inquiryType : '');
      formData.append('budget', typeof data.budget === 'string' ? data.budget : '');
      formData.append('timeline', typeof data.timeline === 'string' ? data.timeline : '');
      formData.append('message', data.message);
      formData.append('consent', String(data.consent));

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      const json = (await res.json().catch(() => null)) as null | { success?: boolean; message?: string };

      if (!res.ok || !json?.success) {
        throw new Error(json?.message || 'Web3Forms submission failed');
      }

      setIsSubmitted(true);

      // Close form after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      setSubmitError('送信に失敗しました。時間をおいて再度お試しください。');
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0f1636] border border-blue-500/30 rounded-2xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">送信を受け付けました</h3>
        <p className="text-blue-200/70 max-w-md mx-auto">
          お問い合わせありがとうございます。<br/>
          内容を確認の上、担当者より2営業日以内にご連絡いたします。
        </p>
        <div className="mt-8 w-full bg-blue-900/20 h-1 rounded-full overflow-hidden max-w-[200px]">
           <motion.div 
             className="h-full bg-blue-500"
             initial={{ width: "0%" }}
             animate={{ width: "100%" }}
             transition={{ duration: 3, ease: "linear" }}
           />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-[#0f1636] border border-white/10 rounded-2xl p-6 md:p-10 relative"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-blue-200/50 hover:text-white transition-colors rounded-full hover:bg-white/5"
        type="button"
      >
        <X size={24} />
      </button>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">お問い合わせフォーム</h3>
        <p className="text-sm text-blue-200/60">
          以下のフォームに必要事項をご記入の上、送信してください。<br className="hidden sm:block"/>
          <span className="text-red-400">*</span> は必須項目です。
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Honeypot field - hidden */}
        <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-blue-100">貴社名 <span className="text-red-400">*</span></Label>
            <Input 
              id="company" 
              {...register("company", { required: "貴社名は必須です" })} 
              className="bg-[#0a0f2c] border-white/10 focus:border-blue-500 text-white placeholder:text-white/20"
              placeholder="例: 株式会社プレイリンクス"
            />
            {errors.company && <span className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12}/> {errors.company.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-100">ご担当者名 <span className="text-red-400">*</span></Label>
            <Input 
              id="name" 
              {...register("name", { required: "ご担当者名は必須です" })} 
              className="bg-[#0a0f2c] border-white/10 focus:border-blue-500 text-white placeholder:text-white/20"
              placeholder="例: 山田 太郎"
            />
            {errors.name && <span className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12}/> {errors.name.message}</span>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-100">メールアドレス <span className="text-red-400">*</span></Label>
            <Input 
              id="email" 
              type="email"
              {...register("email", { 
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "有効なメールアドレスを入力してください"
                }
              })} 
              className="bg-[#0a0f2c] border-white/10 focus:border-blue-500 text-white placeholder:text-white/20"
              placeholder="例: info@example.com"
            />
            {errors.email && <span className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12}/> {errors.email.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-blue-100">電話番号 <span className="text-xs text-white/40">(任意)</span></Label>
            <Input 
              id="phone" 
              type="tel"
              {...register("phone")} 
              className="bg-[#0a0f2c] border-white/10 focus:border-blue-500 text-white placeholder:text-white/20"
              placeholder="例: 03-1234-5678"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
             <Label className="text-blue-100">お問い合わせ種別 <span className="text-xs text-white/40">(任意)</span></Label>
             <Select onValueChange={(val) => setValue("inquiryType", val)}>
               <SelectTrigger className="bg-[#0a0f2c] border-white/10 text-white">
                 <SelectValue placeholder="選択してください" />
               </SelectTrigger>
               <SelectContent className="bg-[#0a0f2c] border-blue-500/20 text-white">
                 <SelectItem value="dev_request">開発のご依頼</SelectItem>
                 <SelectItem value="partnership">パートナーシップ</SelectItem>
                 <SelectItem value="recruit">採用について</SelectItem>
                 <SelectItem value="other">その他</SelectItem>
               </SelectContent>
             </Select>
          </div>

          <div className="space-y-2">
             <Label className="text-blue-100">ご予算感 <span className="text-xs text-white/40">(任意)</span></Label>
             <Select onValueChange={(val) => setValue("budget", val)}>
               <SelectTrigger className="bg-[#0a0f2c] border-white/10 text-white">
                 <SelectValue placeholder="選択してください" />
               </SelectTrigger>
               <SelectContent className="bg-[#0a0f2c] border-blue-500/20 text-white">
                 <SelectItem value="under_3m">~300万円</SelectItem>
                 <SelectItem value="3m_10m">300万円~1,000万円</SelectItem>
                 <SelectItem value="10m_30m">1,000万円~3,000万円</SelectItem>
                 <SelectItem value="over_30m">3,000万円~</SelectItem>
                 <SelectItem value="undecided">未定</SelectItem>
               </SelectContent>
             </Select>
          </div>

          <div className="space-y-2">
             <Label className="text-blue-100">ご希望時期 <span className="text-xs text-white/40">(任意)</span></Label>
             <Select onValueChange={(val) => setValue("timeline", val)}>
               <SelectTrigger className="bg-[#0a0f2c] border-white/10 text-white">
                 <SelectValue placeholder="選択してください" />
               </SelectTrigger>
               <SelectContent className="bg-[#0a0f2c] border-blue-500/20 text-white">
                 <SelectItem value="asap">なるべく早く</SelectItem>
                 <SelectItem value="1_month">1ヶ月以内</SelectItem>
                 <SelectItem value="3_months">3ヶ月以内</SelectItem>
                 <SelectItem value="half_year">半年以内</SelectItem>
                 <SelectItem value="undecided">未定</SelectItem>
               </SelectContent>
             </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-blue-100">お問い合わせ内容 <span className="text-red-400">*</span></Label>
          <Textarea 
            id="message" 
            {...register("message", { required: "お問い合わせ内容は必須です" })} 
            className="bg-[#0a0f2c] border-white/10 focus:border-blue-500 text-white placeholder:text-white/20 min-h-[120px]"
            placeholder="ご相談内容の詳細をご記入ください"
          />
          {errors.message && <span className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12}/> {errors.message.message}</span>}
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-start gap-3">
            <Checkbox 
              id="consent" 
              className="mt-1 border-white/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              onCheckedChange={(checked) => setValue("consent", checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="consent" className="text-white text-sm font-normal cursor-pointer">
                プライバシーポリシーに同意します <span className="text-red-400">*</span>
              </Label>
              <p className="text-xs text-blue-200/50">
                お預かりした個人情報は、お問い合わせへの回答のみに使用いたします。
              </p>
            </div>
          </div>
          {/* Hidden validation message for checkbox since standard required doesn't work well with custom checkbox */}
          {errors.consent && watch("consent") === false && (
             <span className="text-xs text-red-400 flex items-center gap-1 mt-2 ml-7"><AlertCircle size={12}/> プライバシーポリシーへの同意が必要です</span>
          )}
        </div>

        <div className="flex justify-center pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting || !watch("consent")}
            className="w-full md:w-auto px-12 py-6 text-lg bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg shadow-blue-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                送信中...
              </>
            ) : (
              "この内容で送信する"
            )}
          </Button>
        </div>

        {submitError && (
          <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 text-sm text-center">
            {submitError}
          </div>
        )}

      </form>
    </motion.div>
  );
}
