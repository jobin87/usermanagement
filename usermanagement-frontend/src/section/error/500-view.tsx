import { m } from "framer-motion";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/routes/components";

import { ServerErrorIllustration } from "src/assets/illustrations";

import { MotionContainer, varBounce } from "src/components/animate";
import AuthLayout from "src/layout/register/registerLayout";

// ----------------------------------------------------------------------

export function View500() {
  return (
    <AuthLayout>
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            500 Internal server error
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            There was an error, please try again later.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ServerErrorIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button
          component={RouterLink}
          href="/"
          size="large"
          variant="contained"
        >
          Go to home
        </Button>
      </Container>
    </AuthLayout>
  );
}
