import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Main from "../../../templates/main";
import { Input } from "../../atoms/Input/styles";
import Select from "../../atoms/select";
import { getCompanyDetails, updateCompanyDetails } from "../../../../api/profileApi";
import * as S from "./styles";

const initialForm = {
  company_name: "",
  account_holder_name: "",
  account_number: "",
  account_type: "Savings",
  bank_name: "",
  ifsc_code: "",
  branch_address: "",
};

const ACCOUNT_TYPES = [
  { value: "Savings", label: "Savings" },
  { value: "Current", label: "Current" },
];

const Settings = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCompanyDetails()
      .then(({ data }) => {
        setForm({ ...initialForm, ...data });
      })
      .catch(() => toast.error("Could not load company details"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateCompanyDetails(form);
      toast.success("Company details saved");
    } catch {
      toast.error("Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Main>
      <S.Page>
        <S.PageHeader>
          <S.PageTitle>Settings</S.PageTitle>
          <S.PageSubtitle>Company and bank details used in your statement exports.</S.PageSubtitle>
        </S.PageHeader>

        <S.Card>
          <S.CardHeader>
            <S.CardTitle>Company & Bank Details</S.CardTitle>
            <S.CardHint>
              These appear on the bank statement PDF you generate from the AI assistant.
            </S.CardHint>
          </S.CardHeader>

          {loading ? (
            <S.LoaderWrap>
              <S.Spinner />
            </S.LoaderWrap>
          ) : (
            <S.Form onSubmit={handleSubmit}>
              <S.Grid>
                <S.Field>
                  <S.Label htmlFor="company_name">Company name</S.Label>
                  <Input
                    id="company_name"
                    name="company_name"
                    value={form.company_name}
                    onChange={handleChange}
                    placeholder="e.g. Acme Pvt Ltd"
                  />
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="account_holder_name">Account holder name</S.Label>
                  <Input
                    id="account_holder_name"
                    name="account_holder_name"
                    value={form.account_holder_name}
                    onChange={handleChange}
                    placeholder="e.g. Rohit Kumar"
                  />
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="account_number">Account number</S.Label>
                  <Input
                    id="account_number"
                    name="account_number"
                    value={form.account_number}
                    onChange={handleChange}
                    placeholder="e.g. 50200012345678"
                  />
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="account_type">Account type</S.Label>
                  <Select
                    inputId="account_type"
                    name="account_type"
                    options={ACCOUNT_TYPES}
                    value={form.account_type}
                    onChange={(e) => setForm((prev) => ({ ...prev, account_type: e.target.value }))}
                  />
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="bank_name">Bank name</S.Label>
                  <Input
                    id="bank_name"
                    name="bank_name"
                    value={form.bank_name}
                    onChange={handleChange}
                    placeholder="e.g. HDFC Bank"
                  />
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="ifsc_code">IFSC code</S.Label>
                  <Input
                    id="ifsc_code"
                    name="ifsc_code"
                    value={form.ifsc_code}
                    onChange={handleChange}
                    placeholder="e.g. HDFC0001234"
                  />
                </S.Field>

                <S.Field $full>
                  <S.Label htmlFor="branch_address">Branch address</S.Label>
                  <Input
                    id="branch_address"
                    name="branch_address"
                    value={form.branch_address}
                    onChange={handleChange}
                    placeholder="e.g. MG Road, Bengaluru, Karnataka"
                  />
                </S.Field>
              </S.Grid>

              <S.Actions>
                <S.SaveButton type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save details"}
                </S.SaveButton>
              </S.Actions>
            </S.Form>
          )}
        </S.Card>
      </S.Page>
    </Main>
  );
};

export default Settings;
